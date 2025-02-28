import { useState } from 'react';
import petgray from '../../assets/common/petgray.svg';
import Swal from 'sweetalert2';
import { BasicInput } from '../../stories/Input/BasicInput';
import { BasicBtn } from '../../stories/buttons/basic-btn/BasicBtn';
import MotionDiv from './MotionDiv';
import BreedsPanel from './BreedsPanel';
import usePetStore from '../../stores/pet/usePetStore';

const PetForm = ({ title, buttonText, deleteButton, onSubmit, onDelete }) => {
  const { basicData } = usePetStore();
  const [puppyName, setPuppyName] = useState(basicData?.name ?? '');
  const [profileImage, setProfileImage] = useState(null);
  const [breedId, setBreedId] = useState(basicData?.breedId ?? '');
  const [breedName, setBreedName] = useState(basicData?.breedName ?? '');
  const [birthDate, setBirthDate] = useState(basicData?.birthDate ?? '');
  const [gender, setGender] = useState(basicData?.gender ?? '');
  const [neutered, setNeutered] = useState(
    basicData ? basicData.neutered : undefined,
  );
  const [weightFront, setWeightFront] = useState(
    basicData ? String(basicData.weight).split('.')[0] : '',
  );
  const [weightBack, setWeightBack] = useState(
    basicData
      ? String(basicData.weight).includes('.')
        ? String(basicData.weight).split('.')[1]
        : '0'
      : '0',
  );
  const [previewUrl, setPreviewUrl] = useState(
    basicData?.profileImageUrl ?? '',
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkDataForm()) return;
    if (!checkBirthDate(birthDate)) return;
    const puppyData = {
      name: puppyName,
      breedId: breedId,
      birthDate: birthDate,
      gender: gender,
      neutered: neutered,
      weight: Number(weightFront) + Number(weightBack) / 10,
      profileImageUrl: previewUrl,
    };

    const formData = new FormData();
    formData.append('data', JSON.stringify(puppyData));
    if (profileImage) {
      formData.append('image', profileImage);
    }
    onSubmit({ ...puppyData, image: profileImage });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  const handleBreedSelect = (breedId, breedName) => {
    setBreedId(breedId);
    setBreedName(breedName);
  };

  const checkBirthDate = (birthDate) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateRegex.test(birthDate)) {
      Swal.fire({
        title: 'Oops...',
        text: '생년월일은 YYYY-MM-DD 형식이어야 합니다.',
        icon: 'error',
        confirmButtonColor: '#3288FF',
      });
      return false;
    }

    const inputDate = new Date(birthDate).getTime();
    if (isNaN(inputDate) || inputDate > today) {
      Swal.fire({
        title: 'Oops...',
        text: '생년월일은 오늘 이전 날짜여야 합니다.',
        icon: 'error',
        confirmButtonColor: '#3288FF',
      });
      return false;
    }

    return true;
  };

  const checkDataForm = () => {
    if (
      !puppyName ||
      !breedId ||
      !birthDate ||
      !weightFront ||
      !weightBack ||
      !gender
    ) {
      Swal.fire({
        title: 'Oops...',
        text: '모든 항목을 입력해주세요.',
        icon: 'error',
      });
      return false;
    }
    return true;
  };

  const handleBirthDateChange = (e) => {
    let input = e.target.value;
    let numbers = input.replace(/-/g, '');

    if (numbers.length > 8) {
      numbers = numbers.slice(0, 8);
    }

    let formattedInput = '';
    if (numbers.length >= 7) {
      formattedInput =
        numbers.slice(0, 4) +
        '-' +
        numbers.slice(4, 6) +
        '-' +
        numbers.slice(6);
    } else if (numbers.length >= 5) {
      formattedInput = numbers.slice(0, 4) + '-' + numbers.slice(4);
    } else {
      formattedInput = numbers;
    }

    setBirthDate(formattedInput);
  };

  return (
    <div className="flex flex-col mx-5 my-5 md:mx-28">
      <div className="flex w-full text-2xl font-semibold leading-normal">
        우리 강아지 정보를
      </div>
      <div className="flex w-full mb-5 text-2xl font-semibold leading-normal">
        {title}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:gap-6 ">
        <div className="text-red">
          <BasicInput
            label="이름"
            id="name"
            placeholder="이름을 입력하세요"
            onChange={(e) => setPuppyName(e.target.value)}
            value={puppyName}
            required
          />
        </div>
        {puppyName && (
          <MotionDiv>
            <label className="w-20 cursor-pointer">
              <div className="mb-1 text-[15px] font-bold">사진</div>
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="hidden peer"
              />
              <div className="w-20 h-20 bg-[#F5F5F5] border rounded-lg border-inputGray overflow-hidden flex items-center justify-center">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="등록사진 미리보기"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <img
                    src={petgray}
                    alt="이미지 파일 선택"
                    className="object-cover w-full h-full"
                  />
                )}
              </div>
            </label>
          </MotionDiv>
        )}
        {puppyName && (
          <MotionDiv>
            <BreedsPanel
              onBreedSelect={handleBreedSelect}
              breedName={breedName}
              breedId={breedId}
              setBreedName={setBreedName}
            />
          </MotionDiv>
        )}
        {puppyName && breedId && (
          <MotionDiv>
            <BasicInput
              label="생년월일"
              id="breed"
              placeholder="YYYY-MM-DD"
              value={birthDate}
              onChange={handleBirthDateChange}
              max={new Date().toISOString().split('T')[0]}
              required
            />
          </MotionDiv>
        )}
        {puppyName && breedId && birthDate && (
          <MotionDiv>
            <div>
              <div className="mb-1 text-[15px] font-bold">성별</div>
              <div className="flex flex-row justify-between w-full gap-4">
                <label className="w-full">
                  <input
                    type="radio"
                    name="gender"
                    value="W"
                    checked={gender === 'W'}
                    onChange={() => setGender('W')}
                    className="hidden peer"
                  />
                  <div className="flex items-center justify-center text-center border rounded-2xl cursor-pointer h-12 border-inputGray peer-checked:border-[#3288FF] peer-checked:bg-[#C4DDFF] peer-checked:text-[#3288FF]">
                    여아
                  </div>
                </label>
                <label className="w-full">
                  <input
                    type="radio"
                    name="gender"
                    value="M"
                    checked={gender === 'M'}
                    onChange={() => setGender('M')}
                    className="hidden peer"
                  />
                  <div className="flex items-center justify-center text-center border rounded-2xl cursor-pointer h-12 border-inputGray peer-checked:border-[#3288FF] peer-checked:bg-[#C4DDFF] peer-checked:text-[#3288FF]">
                    남아
                  </div>
                </label>
              </div>
            </div>
          </MotionDiv>
        )}
        {puppyName && breedId && birthDate && gender && (
          <MotionDiv>
            <div>
              <div className="mb-1 text-[15px] font-bold">중성화 수술 여부</div>
              <div className="flex flex-row gap-4">
                <label className="w-full">
                  <input
                    type="radio"
                    name="neutered"
                    value={false}
                    checked={neutered === false}
                    onChange={() => setNeutered(false)}
                    className="hidden peer"
                  />
                  <div className="flex items-center justify-center text-center border rounded-2xl cursor-pointer h-12 border-inputGray peer-checked:border-[#3288FF] peer-checked:bg-[#C4DDFF] peer-checked:text-[#3288FF]">
                    안했어요
                  </div>
                </label>
                <label className="w-full">
                  <input
                    type="radio"
                    name="neutered"
                    value={true}
                    checked={neutered === true}
                    onChange={() => setNeutered(true)}
                    className="hidden peer"
                  />
                  <div className="flex items-center justify-center text-center border rounded-2xl cursor-pointer h-12 border-inputGray peer-checked:border-[#3288FF] peer-checked:bg-[#C4DDFF] peer-checked:text-[#3288FF]">
                    했어요
                  </div>
                </label>
              </div>
            </div>
          </MotionDiv>
        )}
        {puppyName &&
          breedId &&
          birthDate &&
          gender &&
          typeof neutered === 'boolean' && (
            <MotionDiv>
              <div className="flex flex-col w-full">
                <div className="mb-1 text-[15px] font-bold">몸무게(kg)</div>
                <label className="flex flex-row items-end justify-between w-full gap-2 mb-5">
                  <input
                    type="number"
                    placeholder="소수점 앞자리"
                    value={weightFront}
                    onChange={(e) => setWeightFront(e.target.value)}
                    min={0}
                    max={99}
                    required
                    className="flex items-center justify-center w-full h-12 px-5 border rounded-lg cursor-pointer text-start border-inputGray "
                  />
                  .
                  <input
                    type="text"
                    placeholder="소수점 뒷자리"
                    value={weightBack}
                    onChange={(e) => setWeightBack(e.target.value)}
                    pattern="[0-9]{0,1}" // 0~9 사이의 숫자 0개 또는 1개만 허용
                    title="소수점 첫 번째 자리까지만 입력해주세요."
                    // min={0}
                    // max={9}
                    required
                    className="flex items-center justify-center w-full h-12 px-5 border rounded-lg cursor-pointer text-start border-inputGray"
                  />
                </label>
              </div>
            </MotionDiv>
          )}
        {puppyName &&
          breedId &&
          birthDate &&
          gender &&
          typeof neutered === 'boolean' &&
          weightFront &&
          weightBack && (
            <MotionDiv>
              <div className="flex flex-col gap-6">
                <BasicBtn
                  styleType="blue"
                  size="lg"
                  label={buttonText}
                  type="submit"
                />
                <BasicBtn
                  styleType="reverseBlue"
                  size="lg"
                  label="삭제"
                  type="button"
                  onClick={onDelete}
                  style={{ display: deleteButton ? 'block' : 'none' }}
                />
              </div>
            </MotionDiv>
          )}
      </form>
    </div>
  );
};

export default PetForm;
