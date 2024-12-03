import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BasicInput } from '../../stories/Input/BasicInput';
import { BasicBtn } from '../../stories/Buttons/BasicBtn/BasicBtn';
import { registerUser } from '../../api/userRegister';
import { instance } from '../../api/axios';

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
  const [profileImage, setProfileImage] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isPhoneTouched, setIsPhoneTouched] = useState(false);
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);

  const [allChecked, setAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState(
    agreements.reduce((acc, item) => ({ ...acc, [item.id]: false }), {}),
  );

  useEffect(() => {
    const storedProfileImage = localStorage.getItem('PROFILE_IMAGE');
    const storedEmail = localStorage.getItem('EMAIL');

    if (storedProfileImage) setProfileImage(storedProfileImage);
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      localStorage.setItem('PROFILE_IMAGE', URL.createObjectURL(file));
    }
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value;
    const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;
    setPhoneNumber(input);

    if (!phoneRegex.test(input)) {
      setPhoneError('전화번호 형식이 올바르지 않습니다. (예: 010-1234-5678)');
    } else {
      setPhoneError('');
    }
  };

  const handlePhoneBlur = () => {
    setIsPhoneTouched(true);
  };

  const handleAllCheck = () => {
    const newCheckedState = !allChecked;
    setAllChecked(newCheckedState);
    setCheckedItems(
      agreements.reduce(
        (acc, item) => ({ ...acc, [item.id]: newCheckedState }),
        {},
      ),
    );
  };

  const handleIndividualCheck = (id) => {
    const newCheckedItems = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(newCheckedItems);

    const allChecked = agreements.every((item) => newCheckedItems[item.id]);
    setAllChecked(allChecked);
  };

  const checkNicknameDuplicate = async () => {
    if (!nickname.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    setIsCheckingNickname(true);

    try {
      const response = await instance.get(
        `/members/check?nickname=${nickname}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );

      const message = response.data.message;
      if (message === '중복된 닉네임입니다.') {
        alert('해당 닉네임은 이미 사용 중입니다!');
      } else {
        alert('사용 가능한 닉네임입니다.');
      }
    } catch (error) {
      console.error(error);
      alert('닉네임 확인 중 오류가 발생했습니다.');
    } finally {
      setIsCheckingNickname(false);
    }
  };

  const isFormValid = () => {
    return (
      profileImage &&
      email &&
      name &&
      nickname &&
      !phoneError &&
      checkedItems['agreeTerms'] &&
      checkedItems['agreePrivacy']
    );
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      alert('모든 필수 정보를 올바르게 입력해주세요.');
      return;
    }

    const memberInfo = {
      name,
      nickname,
      phone: phoneNumber,
    };

    try {
      await registerUser(profileImage, memberInfo);
      alert('등록이 완료되었습니다.');
      navigate('/dog-register');
    } catch (error) {
      console.error('등록 중 오류가 발생했습니다:', error);
      alert('회원가입 중 문제가 발생했습니다.');
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
        placeholder="이메일을 입력해주세요."
        style="gray"
        value={email}
        readOnly
      />
      <BasicInput
        label="이름"
        id="name"
        type="text"
        placeholder="이름을 입력해주세요."
        style="gray"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <BasicInput
        label="닉네임"
        id="nickname"
        type="text"
        placeholder="원하시는 닉네임을 입력해주세요."
        style="gray"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
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
        placeholder="010-1234-5678 형식으로 입력해주세요."
        style="gray"
        value={phoneNumber}
        onChange={handlePhoneChange}
        onBlur={handlePhoneBlur}
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
            onChange={handleAllCheck}
            className="w-4 h-4 mr-2 text-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="agreeAll">모두 동의합니다.</label>
        </div>
        <div className="flex flex-col pl-6 space-y-1">
          {agreements.map((item) => (
            <div key={item.id} className="flex items-center">
              <input
                type="checkbox"
                id={item.id}
                checked={checkedItems[item.id]}
                onChange={() => handleIndividualCheck(item.id)}
                className="w-4 h-4 mr-2 text-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={item.id}>{item.label}</label>
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
