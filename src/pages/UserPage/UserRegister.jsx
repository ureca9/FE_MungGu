import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BasicInput } from '../../stories/Input/BasicInput';
import { BasicBtn } from '../../stories/Buttons/BasicBtn/BasicBtn';
import { registerUser } from '../../api/userRegister';

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

const inputFields = [
  {
    label: '이메일',
    id: 'email',
    type: 'text',
    placeholder: '이메일을 입력해주세요.',
    style: 'gray',
  },
  {
    label: '이름',
    id: 'name',
    type: 'text',
    placeholder: '이름을 입력해주세요.',
    style: 'gray',
  },
  {
    label: '닉네임',
    id: 'nickname',
    type: 'text',
    placeholder: '원하시는 닉네임을 입력해주세요.',
    style: 'gray',
    hasButton: true,
  },
];

const UserRegister = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isPhoneTouched, setIsPhoneTouched] = useState(false);

  const [allChecked, setAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState(
    agreements.reduce((acc, item) => ({ ...acc, [item.id]: false }), {}),
  );

  const handleProfileImageChange = (e) => {
    setProfileImage(e.target.files[0]);
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

  const handleSubmit = async () => {
    if (phoneError) {
      alert('휴대폰 번호를 올바르게 입력해주세요.');
      return;
    }

    if (!profileImage) {
      alert('프로필 이미지를 업로드해주세요.');
      return;
    }

    if (!checkedItems['agreeTerms'] || !checkedItems['agreePrivacy']) {
      alert('필수 약관에 동의해주세요.');
      return;
    }

    const memberInfo = {
      name: document.getElementById('name').value,
      nickname: document.getElementById('nickname').value,
      phone: phoneNumber,
    };

    const formData = new FormData();
    formData.append('MemberInfoDto', JSON.stringify(memberInfo));
    formData.append('ProfileImage', profileImage);

    try {
      await registerUser(formData);
      alert('등록이 완료되었습니다.');
      navigate('/dog-register');
    } catch (error) {
      console.error(error);
      alert('등록 중 오류가 발생했습니다.');
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
              ? `url(${URL.createObjectURL(profileImage)})`
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
      {inputFields.map((field) => (
        <BasicInput
          key={field.id}
          label={field.label}
          id={field.id}
          type={field.type}
          placeholder={field.placeholder}
          style={field.style}
        >
          {field.hasButton && (
            <button className="px-3 py-1 text-xs text-blue-500 border border-blue-500 rounded">
              중복 확인
            </button>
          )}
        </BasicInput>
      ))}
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
          styleType="blue"
          size="md"
          label="다음"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default UserRegister;
