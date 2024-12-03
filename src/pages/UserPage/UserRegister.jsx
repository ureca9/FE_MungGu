import { useState, useEffect } from 'react';
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
  const [form, setForm] = useState({
    profileImage: null,
    email: '',
    name: '',
    nickname: '',
    phoneNumber: '',
  });
  const [phoneError, setPhoneError] = useState('');
  const [isPhoneTouched, setIsPhoneTouched] = useState(false);
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);
  const [checkedItems, setCheckedItems] = useState(
    agreements.reduce((acc, { id }) => ({ ...acc, [id]: false }), {}),
  );

  const allChecked = agreements.every(({ id }) => checkedItems[id]);

  useEffect(() => {
    const storedProfileImage = localStorage.getItem('PROFILE_IMAGE');
    const storedEmail = localStorage.getItem('EMAIL');

    setForm((prev) => ({
      ...prev,
      profileImage: storedProfileImage,
      email: storedEmail || '',
    }));
  }, []);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      localStorage.setItem('PROFILE_IMAGE', fileURL);
      handleChange('profileImage', file);
    }
  };

  const handlePhoneChange = (e) => {
    const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;
    const value = e.target.value;
    handleChange('phoneNumber', value);
    setPhoneError(
      phoneRegex.test(value)
        ? ''
        : '전화번호 형식이 올바르지 않습니다. (예: 010-1234-5678)',
    );
  };

  const handleAgreementChange = (id) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCheckAll = () => {
    const newState = !allChecked;
    setCheckedItems(
      agreements.reduce((acc, { id }) => ({ ...acc, [id]: newState }), {}),
    );
  };

  const checkNicknameDuplicate = async () => {
    if (!form.nickname.trim()) {
      Swal.fire({
        icon: 'warning',
        title: '닉네임을 입력해주세요.',
      });
      return;
    }

    setIsCheckingNickname(true);
    try {
      const message = await checkNickname(form.nickname);
      Swal.fire({
        icon: message === '중복된 닉네임입니다.' ? 'error' : 'success',
        text:
          message === '중복된 닉네임입니다.'
            ? '이미 사용 중인 닉네임입니다.'
            : '사용 가능한 닉네임입니다.',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '오류 발생',
        text: error.message,
      });
    } finally {
      setIsCheckingNickname(false);
    }
  };

  const isFormValid = () => {
    const requiredAgreements = agreements
      .filter((a) => a.required)
      .every(({ id }) => checkedItems[id]);
    return (
      form.profileImage &&
      form.email &&
      form.name &&
      form.nickname &&
      !phoneError &&
      requiredAgreements
    );
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      Swal.fire({
        icon: 'warning',
        title: '필수 정보를 입력해주세요.',
      });
      return;
    }

    try {
      await registerUser(form.profileImage, {
        name: form.name,
        nickname: form.nickname,
        phone: form.phoneNumber,
      });
      Swal.fire({
        icon: 'success',
        title: '등록 완료',
      }).then(() => {
        navigate('/dog-register');
      });
    } catch (error) {
      console.error('등록 중 오류:', error);
      Swal.fire({
        icon: 'error',
        title: '등록 실패',
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <div className="mb-1 text-[15px] font-bold">프로필 이미지</div>
      <div className="flex flex-col items-center mb-6">
        <label
          htmlFor="profileImage"
          className="flex items-center justify-center w-32 h-32 bg-gray-100 border rounded-full cursor-pointer"
          style={{
            backgroundImage: form.profileImage
              ? `url(${typeof form.profileImage === 'string' ? form.profileImage : URL.createObjectURL(form.profileImage)})`
              : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {!form.profileImage && <span className="text-blue-500">등록</span>}
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
        value={form.email}
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
        value={form.name}
        onChange={(e) => handleChange('name', e.target.value)}
      />
      <BasicInput
        label="닉네임"
        id="nickname"
        type="text"
        value={form.nickname}
        onChange={(e) => handleChange('nickname', e.target.value)}
      >
        <button
          onClick={checkNicknameDuplicate}
          disabled={isCheckingNickname}
          className="px-3 py-1 text-xs text-blue-500 border border-blue-500 rounded"
        >
          {isCheckingNickname ? '확인 중' : '중복 확인'}
        </button>
      </BasicInput>
      <BasicInput
        label="휴대폰 번호"
        id="phone"
        type="text"
        value={form.phoneNumber}
        onChange={handlePhoneChange}
        onBlur={() => setIsPhoneTouched(true)}
      />
      {isPhoneTouched && phoneError && (
        <p className="text-xs text-red-500">{phoneError}</p>
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
                checked={checkedItems[id]}
                onChange={() => handleAgreementChange(id)}
                className="w-4 h-4 mr-2 text-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={id}>{label}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full mt-6">
        <BasicBtn
          styleType={isFormValid() ? 'blue' : 'gray'}
          size="md"
          label="다음"
          onClick={handleSubmit}
          disabled={!isFormValid()}
        />
      </div>
    </div>
  );
};

export default UserRegister;
