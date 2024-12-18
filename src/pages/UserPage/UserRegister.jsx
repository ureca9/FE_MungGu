import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { BasicInput } from '../../stories/Input/BasicInput';
import { BasicBtn } from '../../stories/Buttons/BasicBtn/BasicBtn';
import { registerUser } from '../../api/userRegister/userRegister';
import { checkNickname } from '../../api/userRegister/checkNickname';
import KakaoLogo from '../../assets/login/KakaoLogo.svg';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import ROUTER_PATHS from '../../utils/RouterPath';
import useRegisterStore from '../../stores/register/useRegisterStore';

const agreementsList = [
  { id: 'agreeTerms', label: '이용약관 동의 (필수)', required: true },
  {
    id: 'agreePrivacy',
    label: '개인정보 처리방침 동의 (필수)',
    required: true,
  },
  {
    id: 'agreeMarketing',
    label: '마케팅 활용 정보 동의 (선택)',
    required: false,
  },
];

const UserRegister = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo, agreements, setAgreements } =
    useRegisterStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      try {
        reset({
          profileImage: localStorage.getItem('PROFILE_IMAGE') ?? null,
          email: localStorage.getItem('EMAIL') ?? '',
          ...userInfo,
          ...agreements,
        });
      } catch (error) {
        console.error('로컬 스토리지 접근 중 오류 발생:', error);
        reset({ ...userInfo, ...agreements });
      }
    }
  }, [userInfo, agreements, reset]);

  const handleChange = (field, value) => {
    if (field in userInfo) {
      setUserInfo((prev) => ({ ...prev, [field]: value }));
    } else if (field in agreements) {
      setAgreements((prev) => ({ ...prev, [field]: value }));
    }
    setValue(field, value, { shouldDirty: true });
  };

  const profileImage = watch('profileImage');

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

      const fileURL = URL.createObjectURL(file);
      localStorage.setItem('PROFILE_IMAGE', fileURL);
      setValue('profileImage', file);
    }
  };

  const handleCheckAll = () => {
    const allChecked = agreementsList.every(({ id }) => agreements[id]);
    const newAgreements = agreementsList.reduce((acc, { id }) => {
      acc[id] = !allChecked;
      return acc;
    }, {});
    setAgreements(newAgreements);
    Object.keys(newAgreements).forEach((id) => setValue(id, newAgreements[id]));
  };

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

    const nicknameRegex = /^[가-힣a-zA-Z0-9 ]{2,8}$/;
    if (!nicknameRegex.test(nickname.trim())) {
      Swal.fire({
        icon: 'warning',
        title: '닉네임 형식 오류',
        text: '2~8자의 한글, 영문, 숫자만 사용 가능합니다.',
        confirmButtonColor: '#3288FF',
      });
      return false;
    }

    try {
      const message = await checkNickname(nickname.trim());
      const isAvailable = message !== '중복된 닉네임입니다.';
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
    const requiredAgreements = agreementsList
      .filter((a) => a.required)
      .every(({ id }) => data[id]);

    if (!requiredAgreements) {
      Swal.fire({
        icon: 'warning',
        title: '필수 동의를 확인해주세요.',
        confirmButtonColor: '#3288FF',
      });
      return;
    }

    try {
      await registerUser(data.profileImage, {
        name: data.name,
        nickname: data.nickname,
        phone: data.phone,
      });
      setUserInfo({
        name: data.name,
        nickname: data.nickname,
        phone: data.phone,
      });
      setAgreements({
        agreeTerms: data.agreeTerms,
        agreePrivacy: data.agreePrivacy,
        agreeMarketing: data.agreeMarketing,
      });
      Swal.fire({
        icon: 'success',
        title: '등록 완료',
        confirmButtonColor: '#3288FF',
      }).then(() => {
        navigate(ROUTER_PATHS.PET_REGISTER);
      });
    } catch (error) {
      let errorMessage = '알 수 없는 오류가 발생했습니다.';
      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage = '입력하신 정보를 다시 확인해주세요.';
            break;
          case 409:
            errorMessage = '이미 등록된 정보입니다.';
            break;
          case 500:
            errorMessage = '서버 오류가 발생했습니다.';
            break;
        }
      }
      Swal.fire({
        icon: 'error',
        title: '등록 실패',
        text: errorMessage,
        confirmButtonColor: '#3288FF',
      });
    }
  };

  return (
    <>
      <div className="flex">
        <div className="h-1 w-1/4 bg-[#3288ff]"></div>
        <div className="h-1 w-3/4 bg-[#3288ff] opacity-20"></div>
      </div>
      <form
        className="w-full max-w-md px-10 mx-auto mt-10 md:px-0"
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
          value={watch('email') || ''}
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
          value={watch('name') || ''}
          onChange={(e) => handleChange('name', e.target.value)}
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
          value={watch('nickname') || ''}
          onChange={(e) => handleChange('nickname', e.target.value)}
          placeholder="2~8자의 한글, 영문, 숫자만 입력 가능합니다."
          {...register('nickname', {
            required: '닉네임은 필수 입력 항목입니다.',
            pattern: {
              value: /^[가-힣a-zA-Z0-9]{2,8}$/,
              message: '2~8자의 한글, 영문, 숫자만 사용 가능합니다.',
            },
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
          value={watch('phone') || ''}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="휴대폰 번호를 입력해주세요."
          {...register('phone', {
            required: '휴대폰 번호는 필수 입력 항목입니다.',
            validate: (value) => {
              const phoneRegex = /^01[0-9]-\d{4}-\d{4}$/;
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
            setValue('phone', value);
          }}
        />

        {errors.phone && (
          <p className="text-xs text-red-500">{errors.phone.message}</p>
        )}
        <div className="flex flex-col w-full mt-8 space-y-2 text-sm">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="agreeAll"
              checked={agreementsList.every(({ id }) => agreements[id])}
              onChange={handleCheckAll}
              className="w-4 h-4 mr-2 text-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="agreeAll">모두 동의합니다.</label>
          </div>
          <div className="flex flex-col pl-6 space-y-1">
            {agreementsList.map(({ id, label }) => (
              <div key={id} className="flex items-center">
                <input
                  type="checkbox"
                  id={id}
                  {...register(id)}
                  onChange={(e) => handleChange(id, e.target.checked)}
                  className="w-4 h-4 mr-2 text-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={id}>{label}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full mt-6 mb-16">
          <BasicBtn
            styleType={!isSubmitting ? 'blue' : 'gray'}
            size="md"
            label="다음"
            type="submit"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </>
  );
};

export default UserRegister;
