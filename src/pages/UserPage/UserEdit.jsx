import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { BasicInput } from '../../stories/Input/BasicInput';
import { BasicBtn } from '../../stories/Buttons/BasicBtn/BasicBtn';
import {
  fetchUserDetails,
  updateUserDetails,
} from '../../api/userEdit/userEdit';
import { checkNickname } from '../../api/userRegister/checkNickname';
import KakaoLogo from '../../assets/login/KakaoLogo.svg';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import ROUTER_PATHS from '../../utils/RouterPath';
import { debounce } from 'lodash';

const UserEdit = () => {
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      profileImage: null,
      email: '',
      name: '',
      nickname: '',
      phoneNumber: '',
    },
  });

  const profileImage = watch('profileImage');

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const data = await fetchUserDetails();
        setValue('name', data.name);
        setValue('email', data.email);
        setValue('nickname', data.nickname);
        setValue('phoneNumber', data.phone);
        setValue('profileImage', data.profileImageUrl);
        localStorage.setItem('PROFILE_IMAGE', data.profileImageUrl);
      } catch (error) {
        console.error('Error loading user details:', error);
        Swal.fire({
          icon: 'error',
          title: '사용자 정보 로드 실패',
          text: '사용자 정보를 불러오는데 실패했습니다.',
          confirmButtonColor: '#3288FF',
        });
      }
    };

    loadUserDetails();
    return () => {
      localStorage.removeItem('PROFILE_IMAGE');
    };
  }, [setValue]);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024;
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

      if (!allowedTypes.includes(file.type)) {
        Swal.fire({
          icon: 'error',
          title: '지원하지 않는 파일 형식',
          text: 'JPG, PNG, JPEG 형식만 지원합니다.',
          confirmButtonColor: '#3288FF',
        });
        return;
      }

      if (file.size > maxSize) {
        Swal.fire({
          icon: 'error',
          title: '파일 크기 초과',
          text: '5MB 이하의 이미지만 업로드 가능합니다.',
          confirmButtonColor: '#3288FF',
        });
        return;
      }

      setValue('profileImage', file);
      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(newPreviewUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const debouncedCheckNickname = debounce(async (nickname) => {
    try {
      const message = await checkNickname(nickname.trim());
      return message !== '중복된 닉네임입니다.';
    } catch (error) {
      console.error(error);
      return false;
    }
  }, 500);

  const checkNicknameDuplicate = async () => {
    const nickname = watch('nickname');

    if (!nickname || nickname.trim().length === 0) {
      Swal.fire({
        icon: 'warning',
        title: '닉네임을 입력해주세요.',
        confirmButtonColor: '#3288FF',
      });
      return false;
    }

    const nicknameRegex = /^[가-힣a-zA-Z0-9]{2,8}$/;
    if (!nicknameRegex.test(nickname.trim())) {
      Swal.fire({
        icon: 'warning',
        title: '닉네임 형식 오류',
        text: '2~8자의 한글, 영문, 숫자만 입력 가능합니다.',
        confirmButtonColor: '#3288FF',
      });
      return false;
    }

    try {
      const isAvailable = await debouncedCheckNickname(nickname);
      Swal.fire({
        icon: isAvailable ? 'success' : 'error',
        text: isAvailable
          ? '사용 가능한 닉네임입니다.'
          : '이미 사용 중인 닉네임입니다.',
        confirmButtonColor: '#3288FF',
      });
      return isAvailable;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '오류 발생',
        text: '닉네임 확인 중 오류가 발생했습니다.',
        confirmButtonColor: '#3288FF',
      });
      console.error(error);
      return false;
    }
  };

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    try {
      const updatedData = await updateUserDetails(data.profileImage, {
        name: data.name,
        nickname: data.nickname,
        phone: data.phoneNumber,
      });
      setValue('name', updatedData.name);
      setValue('nickname', updatedData.nickname);
      setValue('phoneNumber', updatedData.phone);
      setValue('profileImage', updatedData.profileImage);
      navigate(ROUTER_PATHS.MY_PAGE);
    } catch (error) {
      console.error('Error updating user details:', error);
      Swal.fire({
        icon: 'error',
        title: '업데이트 실패',
        text: '사용자 정보 업데이트 중 오류가 발생했습니다.',
        confirmButtonColor: '#3288FF',
      });
    }
  };

  return (
    <form
      className="w-full max-w-md mx-auto mt-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-1 text-[15px] font-bold">프로필 이미지</div>
      <div className="flex flex-col items-center mb-6">
        <label
          htmlFor="profileImage"
          className="flex items-center justify-center w-32 h-32 bg-gray-100 border rounded-full cursor-pointer"
          style={{
            backgroundImage: profileImage
              ? `url(${typeof profileImage === 'string' ? profileImage : URL.createObjectURL(profileImage)})`
              : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {!profileImage && <span className="text-blue-500">등록</span>}
        </label>
        <input
          type="file"
          id="profileImage"
          className="hidden"
          accept="image/*"
          onChange={handleProfileImageChange}
        />
      </div>

      <BasicInput
        label="이메일"
        id="email"
        type="text"
        value={watch('email')}
        style="disabled"
        readOnly
        disabled
      >
        <img src={KakaoLogo} alt="Kakao Logo" className="w-5 h-5" />
      </BasicInput>

      <BasicInput
        label="이름"
        id="name"
        type="text"
        placeholder="이름을 입력해주세요."
        {...register('name', { required: '이름은 필수 입력 항목입니다.' })}
      />
      {errors.name && (
        <p className="text-xs text-red-500">{errors.name.message}</p>
      )}

      <BasicInput
        label="닉네임"
        id="nickname"
        type="text"
        placeholder="2~8자의 한글, 영문, 숫자만 입력 가능합니다."
        {...register('nickname', {
          required: '닉네임은 필수 입력 항목입니다.',
        })}
      >
        <button
          type="button"
          className="absolute right-1 w-[65px] top-1/2 transform -translate-y-1/2 py-1 text-xs text-[#3288FF] border border-[#3288FF] rounded transition"
          onClick={checkNicknameDuplicate}
        >
          중복 확인
        </button>
      </BasicInput>
      {errors.nickname && (
        <p className="text-xs text-red-500">{errors.nickname.message}</p>
      )}

      <BasicInput
        label="휴대폰 번호"
        id="phone"
        type="text"
        placeholder="휴대폰 번호를 입력해주세요."
        {...register('phoneNumber', {
          required: '휴대폰 번호는 필수 입력 항목입니다.',
          validate: (value) => {
            const phoneRegex = /^01[016789]-\d{3,4}-\d{4}$/;
            if (!phoneRegex.test(value)) {
              return '휴대폰 번호는 11자리여야 합니다.';
            }
            return true;
          },
        })}
        maxLength={13}
        onInput={(e) => {
          let value = e.target.value.replace(/\D/g, '');

          if (value.length > 3 && value.length <= 7) {
            value = value.replace(/(\d{3})(\d{1,4})/, '$1-$2');
          } else if (value.length > 7) {
            value = value.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
          }

          e.target.value = value;
          setValue('phoneNumber', value);
        }}
      />
      {errors.phoneNumber && (
        <p className="text-xs text-red-500">{errors.phoneNumber.message}</p>
      )}

      <div className="w-full mt-12 mb-16">
        <BasicBtn
          styleType={!isSubmitting ? 'blue' : 'gray'}
          size="md"
          label="저장"
          type="submit"
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
};

export default UserEdit;
