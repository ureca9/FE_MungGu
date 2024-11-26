import React from 'react';

const PetForm = ({ title, buttonText, deleteButton, onSubmit01 }) => {
  return (
    <>
      <h2>{title}</h2>
      <form onSubmit={onSubmit01}>
        <label>
          이름 <br />
          <input
            type="text"
            name="name"
            placeholder="우리 강아지 이름을 입력해주세요."
            required
          />
        </label>
        <br />
        <label>
          사진 <br /> <input type="file" name="image" />
        </label>
        <br />
        <label>
          견종 <br /> <input type="" name="breed" required />
        </label>
        <br />
        <label>
          생년월일 <br /> <input type="date" name="birthDate" required />
        </label>
        <br />
        성별 <br />
        <label>
          <input type="radio" name="gender" value="w" defaultChecked />
          여아
        </label>
        <label>
          <input type="radio" name="gender" value="m" />
          남아
        </label>
        <br />
        중성화 수술 여부 <br />
        <label>
          <input type="radio" name="neutered" value="false" defaultChecked />
          안했어요
        </label>
        <label>
          <input type="radio" name="neutered" value="true" />
          했어요
        </label>
        <br />
        <label>
          몸무게(kg) <br />
          <input
            type="number"
            placeholder="소수점 앞자리"
            min={1}
            max={99}
            required
          />
          <input type="number" placeholder="소수점 뒷자리" min={0} max={9} />
        </label>
        <br />
        <button
          type="submit"
          name="submit"
          className="bg-sky-200 hover:bg-sky-400 p-1"
        >
          {buttonText}
        </button>
        <button
          type="submit"
          style={{ display: deleteButton ? 'block' : 'none' }}
          className="bg-sky-200 hover:bg-sky-400 p-1"
        >
          삭제
        </button>
      </form>
    </>
  );
};

export default PetForm;
