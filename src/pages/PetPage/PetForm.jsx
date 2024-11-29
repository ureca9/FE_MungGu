import { useState } from 'react';
import petgray from '../../assets/common/petgray.svg';
import { BasicBtn } from '../../stories/Buttons/BasicBtn/BasicBtn';
const PetForm = ({
  title,
  buttonText,
  deleteButton,
  initialData = {},
  onSubmit,
  onDelete,
}) => {
  const [puppyName, setPuppyName] = useState(initialData.name || '');
  const [profileImage, setProfileImage] = useState(null);
  const [breedId, setBreedId] = useState(initialData.breedId || '');
  const [birthDate, setBirthDate] = useState(initialData.birthDate || '');
  const [gender, setGender] = useState(initialData.gender || 'w');
  const [neutered, setNeutered] = useState(initialData.neutered || 'false');
  const [weightFront, setWeightFront] = useState(
    initialData.weight ? initialData.weight.split('.')[0] : '',
  );
  const [weightBack, setWeightBack] = useState(
    initialData.weight ? initialData.weight.split('.')[1] : '',
  );
  const [previewUrl, setPreviewUrl] = useState(''); // 미리보기 URL 상태
  //   const [weightBack, setWeightBack] = useState(
  //     initialData.weight && initialData.weight.includes('.')
  //       ? initialData.weight.split('.')[1]
  //       : ''
  // );

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', puppyName);
    formData.append('breedId', breedId);
    formData.append('birthDate', birthDate);
    formData.append('gender', gender);
    formData.append('neutered', neutered);
    formData.append('weight', `${weightFront}.${weightBack}`);
    if (profileImage) {
      formData.append('image', profileImage);
    }
    onSubmit(formData);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file); // 선택된 파일 저장
      setPreviewUrl(URL.createObjectURL(file)); // 파일 객체를 URL로 변환
    }
  };

  return (
    <div className="flex flex-col my-5 mx-28">
      <div className="flex w-48 text-2xl font-semibold leading-normal">
        {title}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 ">
        <div className="flex mt-5">
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
        </div>

        <label className="w-20 cursor-pointer">
          <div className="mb-1 text-xl">사진</div>
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
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
          <div className="mb-2 text-xl">성별</div>
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
              <div className="flex items-center justify-center text-center border rounded-2xl cursor-pointer h-14 border-inputGray peer-checked:border-[#3288FF] peer-checked:bg-[#C4DDFF] peer-checked:text-[#3288FF]">
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
              <div className="flex items-center justify-center text-center border rounded-2xl cursor-pointer h-14 border-inputGray peer-checked:border-[#3288FF] peer-checked:bg-[#C4DDFF] peer-checked:text-[#3288FF]">
                남아
              </div>
            </label>
          </div>
        </div>
        <div>
          <div className="mb-2 text-xl">중성화 수술 여부</div>
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
              <div className="flex items-center justify-center text-center border rounded-2xl cursor-pointer h-14 border-inputGray peer-checked:border-[#3288FF] peer-checked:bg-[#C4DDFF] peer-checked:text-[#3288FF]">
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
              <div className="flex items-center justify-center text-center border rounded-2xl cursor-pointer h-14 border-inputGray peer-checked:border-[#3288FF] peer-checked:bg-[#C4DDFF] peer-checked:text-[#3288FF]">
                했어요
              </div>
            </label>
          </div>
        </div>
        <div className='flex flex-col w-full'>
          <div className="mb-2 text-xl">몸무게(kg)</div>
          <label className="flex flex-row justify-between w-full gap-4 mb-5">
            <input
              type="number"
              placeholder="소수점 앞자리"
              value={weightFront}
              onChange={(e) => setWeightFront(e.target.value)}
              min={0}
              max={99}
              required
              className="flex items-center justify-center w-full px-5 text-center border rounded-lg cursor-pointer h-14 border-inputGray "
            />
            <input
              type="number"
              placeholder="소수점 뒷자리"
              value={weightBack}
              onChange={(e) => setWeightBack(e.target.value)}
              min={0}
              max={9}
              required
              className="flex items-center justify-center w-full px-5 border rounded-lg cursor-pointer text-start h-14 border-inputGray"
            />
          </label>
        </div>
        <BasicBtn styleType="blue" size="lg" label={buttonText} type="submit" />
        <BasicBtn
          styleType="reverseBlue"
          size="lg"
          label="삭제"
          type="submit"
          onClick={onDelete}
          style={{ display: deleteButton ? 'block' : 'none' }}
        />
      </form>
    </div>
  );
};

export default PetForm;
