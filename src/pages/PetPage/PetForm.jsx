import { useState } from 'react';
import petgray from '../../assets/common/petgray.svg';
import { BasicBtn } from '../../stories/Buttons/BasicBtn/BasicBtn';

import { BasicInput } from '../../stories/Input/BasicInput';
import BreedsPanel from '../../components/pet/BreedsPanel';
import Swal from 'sweetalert2';
const PetForm = ({
  title,
  buttonText,
  deleteButton,
  basicData = {},
  onSubmit,
  onDelete,
}) => {
  const [puppyName, setPuppyName] = useState(basicData.name || '');
  const [profileImage, setProfileImage] = useState(null);
  const [breedId, setBreedId] = useState(basicData.breedId || '');
  const [breedName, setBreedName] = useState(basicData.breedName || '');
  const [birthDate, setBirthDate] = useState(basicData.birthDate || '');
  const [gender, setGender] = useState(basicData.gender || '');
  const [neutered, setNeutered] = useState(basicData.neutered || '');
  const [weightFront, setWeightFront] = useState(
    basicData.weight ? basicData.weight.split('.')[0] : '',
  );
  const [weightBack, setWeightBack] = useState(
    basicData.weight ? basicData.weight.split('.')[1] : '',
  );
  const [previewUrl, setPreviewUrl] = useState(''); // 미리보기 URL 상태

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkDateForm()) return;
    const today = new Date();
    const inputDate = new Date(birthDate);
    const isValidDate =
      /^\d{4}-\d{2}-\d{2}$/.test(birthDate) && !isNaN(inputDate);

    if (inputDate > today || !isValidDate) {
      Swal.fire({
        title: 'Oops...',
        text: '생년월일은 오늘 이전 날짜여야 하며, YYYY-MM-DD 형식이어야 합니다.',
        icon: 'error',
      });
      return;
    }

    const puppyData = {
      name: puppyName,
      breedId: breedId,
      birthDate: birthDate,
      gender: gender,
      neutered: neutered,
      weight: `${weightFront}.${weightBack}`,
    };

    const formData = new FormData();
    formData.append('data', JSON.stringify(puppyData));
    if (profileImage) {
      formData.append('image', profileImage);
    }
    console.log('저장하는 데이터 :', [...formData.entries()]);
    onSubmit(formData);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file); // 선택된 파일 저장
      setPreviewUrl(URL.createObjectURL(file)); // 파일 객체를 URL로 변환
    }
  };
  const handleBreedSelect = (breedId, breedName) => {
    setBreedId(breedId);
    setBreedName(breedName);
  };

  const checkDateForm = () => {
    if (
      !puppyName ||
      !profileImage ||
      !breedId ||
      !birthDate ||
      !weightFront ||
      !weightBack ||
      !gender ||
      !neutered
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

  return (
    <div className="flex flex-col my-5 mx-28">
      <div className="flex w-48 mb-5 text-2xl font-semibold leading-normal">
        {title}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 ">
        <BasicInput
          label="이름"
          id="name"
          placeholder="이름을 입력하세요"
          onChange={(e) => setPuppyName(e.target.value)}
          value={puppyName}
          required
        />
        {puppyName && (
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
        )}
        {puppyName && profileImage && (
          <BreedsPanel
            onBreedSelect={handleBreedSelect}
            breedName={breedName}
            breedId={breedId}
            setBreedName={setBreedName}
          />
        )}
        {/* {puppyName && previewUrl && (
          <BasicInput
            label="견종"
            id="breedId"
            placeholder="견종"
            onChange={(e) => setBreedId(e.target.value)}
            value={breedId}
            required
          />
        )} */}
        {puppyName && previewUrl && breedId && (
          <BasicInput
            label="생년월일"
            id="breed"
            placeholder="YYYY-MM-DD"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            required
          />
        )}
        {puppyName && previewUrl && breedId && birthDate && (
          <div>
            <div className="mb-1 text-[15px] font-bold">성별</div>
            <div className="flex flex-row justify-between w-full gap-4">
              <label className="w-full">
                <input
                  type="radio"
                  name="gender"
                  value="w"
                  checked={gender === 'w'}
                  onChange={() => setGender('w')}
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
                  value="m"
                  checked={gender === 'm'}
                  onChange={() => setGender('m')}
                  className="hidden peer"
                />
                <div className="flex items-center justify-center text-center border rounded-2xl cursor-pointer h-12 border-inputGray peer-checked:border-[#3288FF] peer-checked:bg-[#C4DDFF] peer-checked:text-[#3288FF]">
                  남아
                </div>
              </label>
            </div>
          </div>
        )}
        {puppyName && previewUrl && breedId && birthDate && gender && (
          <div>
            <div className="mb-1 text-[15px] font-bold">중성화 수술 여부</div>
            <div className="flex flex-row gap-4">
              <label className="w-full">
                <input
                  type="radio"
                  name="neutered"
                  value="false"
                  checked={neutered === 'false'}
                  onChange={() => setNeutered('false')}
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
                  value="true"
                  checked={neutered === 'true'}
                  onChange={() => setNeutered('true')}
                  className="hidden peer"
                />
                <div className="flex items-center justify-center text-center border rounded-2xl cursor-pointer h-12 border-inputGray peer-checked:border-[#3288FF] peer-checked:bg-[#C4DDFF] peer-checked:text-[#3288FF]">
                  했어요
                </div>
              </label>
            </div>
          </div>
        )}
        {puppyName &&
          previewUrl &&
          breedId &&
          birthDate &&
          gender &&
          neutered && (
            <div className="flex flex-col w-full">
              <div className="mb-1 text-[15px] font-bold">몸무게(kg)</div>
              <label className="flex flex-row justify-between w-full gap-4 mb-5">
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
                <input
                  type="number"
                  placeholder="소수점 뒷자리"
                  value={weightBack}
                  onChange={(e) => setWeightBack(e.target.value)}
                  min={0}
                  max={9}
                  required
                  className="flex items-center justify-center w-full h-12 px-5 border rounded-lg cursor-pointer text-start border-inputGray"
                />
              </label>
            </div>
          )}
        {puppyName &&
          previewUrl &&
          breedId &&
          birthDate &&
          gender &&
          neutered &&
          weightBack && (
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
                type="submit"
                onClick={onDelete}
                style={{ display: deleteButton ? 'block' : 'none' }}
              />
            </div>
          )}
      </form>
    </div>
  );
};

export default PetForm;

{
  /* <div className="flex mt-5">
          <label className="w-full">
            <span className="text-xl">이름</span>
            <br />
            <input
              type="text"
              value={puppyName}
              onChange={(e) => setPuppyName(e.target.value)}
              placeholder="우리 강아지 이름을 입력해주세요."
              required
              className="w-full px-3 mt-2 border rounded-lg h-14 felx border-inputGray"
            />
          </label>
        </div> */
}
{
  /* <div>
          <label className="w-full">
            <div className="mb-2 text-xl">견종</div>
            <input
              type="text"
              name="breedId"
              value={breedId}
              onChange={(e) => setBreedId(e.target.value)}
              required
              placeholder="견종"
              className="w-full px-3 border rounded-lg h-14 felx border-inputGray"
            />
          </label>
        </div> */
}
{
  /* <div>
          <label className="w-full">
            <div className="mb-2 text-xl">생년월일</div>
            <input
              type="date"
              value={birthDate}
              pattern="\d{8}"
              placeholder="YYYYMMDD"
              onInput="this.value = this.value.replace(/\D/g, '')"
              onChange={(e) => setBirthDate(e.target.value)}
              required
              className="w-full px-3 border rounded-lg h-14 felx border-inputGray"
            />
          </label>
        </div> */
}
