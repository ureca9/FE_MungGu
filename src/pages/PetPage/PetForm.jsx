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
    <div className="flex flex-col mx-24 my-5">
      <div className="flex w-48 text-2xl font-semibold">{title}</div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <div className="flex mt-5">
          <label>
            <span>이름</span>
            <br />
            <input
              type="text"
              value={puppyName}
              onChange={(e) => setPuppyName(e.target.value)}
              placeholder="우리 강아지 이름을 입력해주세요."
              required
            />
          </label>
        </div>
        <div className="">
          <label>
            <span>사진</span> <br />
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="hidden peer"
            />
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="등록사진 미리보기"
                className="w-20 h-20"
              />
            ) : (
              <img src={petgray} alt="이미지 파일 선택" className="w-20 h-20" />
            )}
          </label>
        </div>
        <div>
          <label>
            견종 <br />
            <input
              type="text"
              name="breedId"
              value={breedId}
              onChange={(e) => setBreedId(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            생년월일<br />
            <input
              type="date"
              value={birthDate}
              pattern="\d{8}"
              placeholder="YYYYMMDD"
              onInput="this.value = this.value.replace(/\D/g, '')"
              onChange={(e) => setBirthDate(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          성별
          <div className="flex flex-row">
            <label>
              <input
                type="radio"
                name="gender"
                value="w"
                checked={gender === 'w'}
                onChange={() => setGender('w')}
                className="hidden peer"
              />
              <div className="flex items-center justify-center w-48 h-12 text-center peer-checked:bg-blue-500">
                여아
              </div>
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="m"
                checked={gender === 'm'}
                onChange={() => setGender('m')}
                className="hidden peer"
              />
              <div className="flex items-center justify-center w-48 h-12 text-center peer-checked:bg-blue-500">
                남아
              </div>
            </label>
          </div>
        </div>
        <div>
          중성화 수술 여부
          <div className="flex flex-row">
            <label>
              <input
                type="radio"
                name="neutered"
                value="false"
                checked={neutered === 'false'}
                onChange={() => setNeutered('false')}
                className="hidden peer"
              />
              <div className="flex items-center justify-center w-48 h-12 text-center peer-checked:bg-blue-500">
                안했어요
              </div>
            </label>
            <label>
              <input
                type="radio"
                name="neutered"
                value="true"
                checked={neutered === 'true'}
                onChange={() => setNeutered('true')}
                className="hidden peer"
              />
              <div className="flex items-center justify-center w-48 h-12 text-center peer-checked:bg-blue-500">
                했어요
              </div>
            </label>
          </div>
        </div>
        <div>
          <label>
            몸무게(kg) <br />
            <input
              type="number"
              placeholder="소수점 앞자리"
              value={weightFront}
              onChange={(e) => setWeightFront(e.target.value)}
              min={0}
              max={99}
              required
              className="w-40"
            />
            <input
              type="number"
              placeholder="소수점 뒷자리"
              value={weightBack}
              onChange={(e) => setWeightBack(e.target.value)}
              min={0}
              max={9}
              required
              className="w-40"
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
