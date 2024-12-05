import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { BasicInput } from '../../stories/Input/BasicInput';
import { BasicBtn } from '../../stories/Buttons/BasicBtn/BasicBtn';
import { registerUser } from '../../api/userRegister';
import { checkNickname } from '../../api/checkNickname';
import KakaoLogo from '../../assets/login/KakaoLogo.svg';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const agreements = [
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

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      profileImage: null,
      email: localStorage.getItem('EMAIL') || '',
      name: '',
      nickname: '',
      phoneNumber: '',
      agreeTerms: false,
      agreePrivacy: false,
      agreeMarketing: false,
    },
  });

  const profileImage = watch('profileImage');
  const allChecked = agreements.every(({ id }) => watch(id));

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

      if (!allowedTypes.includes(file.type)) {
        Swal.fire({
          icon: 'error',
          title: '지원하지 않는 파일 형식',
          text: 'JPG, PNG, JPEG 형식만 지원합니다.',
        });
        return;
      }

      if (file.size > maxSize) {
        Swal.fire({
          icon: 'error',
          title: '파일 크기 초과',
          text: '5MB 이하의 이미지만 업로드 가능합니다.',
        });
        return;
      }

      const fileURL = URL.createObjectURL(file);
      localStorage.setItem('PROFILE_IMAGE', fileURL);
      setValue('profileImage', file);
    }
  };

  const handleCheckAll = () => {
    const newState = !allChecked;
    agreements.forEach(({ id }) => setValue(id, newState));
  };

  const checkNicknameDuplicate = async (nickname) => {
    if (!nickname.trim()) {
      Swal.fire({
        icon: 'warning',
        title: '닉네임을 입력해주세요.',
      });
      return false;
    }

    const nicknameRegex = /^[가-힣a-zA-Z0-9]{2,8}$/;
    if (!nicknameRegex.test(nickname)) {
      Swal.fire({
        icon: 'warning',
        title: '닉네임 형식 오류',
        text: '2~8자의 한글, 영문, 숫자만 사용 가능합니다.',
      });
      return false;
    }

    try {
      const message = await checkNickname(nickname);
      const isAvailable = message !== '중복된 닉네임입니다.';
      Swal.fire({
        icon: isAvailable ? 'success' : 'error',
        text: isAvailable
          ? '사용 가능한 닉네임입니다.'
          : '이미 사용 중인 닉네임입니다.',
      });
      return isAvailable;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '오류 발생',
        text: error.message,
      });
      return false;
    }
  };

  const onSubmit = async (data) => {
    const requiredAgreements = agreements
      .filter((a) => a.required)
      .every(({ id }) => data[id]);

    if (!requiredAgreements) {
      Swal.fire({
        icon: 'warning',
        title: '필수 동의를 확인해주세요.',
      });
      return;
    }

    try {
      await registerUser(data.profileImage, {
        name: data.name,
        nickname: data.nickname,
        phone: data.phoneNumber,
      });
      Swal.fire({
        icon: 'success',
        title: '등록 완료',
      }).then(() => {
        navigate('/dog-register');
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '등록 실패',
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
          validate: async (value) => await checkNicknameDuplicate(value),
        })}
      />
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
          pattern: {
            value: /^\d{3}-\d{3,4}-\d{4}$/,
            message: '올바른 휴대폰 번호 형식을 입력해주세요.',
          },
        })}
      />
      {errors.phoneNumber && (
        <p className="text-xs text-red-500">{errors.phoneNumber.message}</p>
      )}
      <div className="flex flex-col w-full mt-4 space-y-2 text-sm">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="agreeAll"
            checked={allChecked}
            onChange={handleCheckAll}
            className="w-4 h-4 mr-2 text-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="agreeAll">모두 동의합니다.</label>
        </div>
        <div className="flex flex-col pl-6 space-y-1">
          {agreements.map(({ id, label }) => (
            <div key={id} className="flex items-center">
              <input
                type="checkbox"
                id={id}
                {...register(id)}
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
  );
};

export default UserRegister;
