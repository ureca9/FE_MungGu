const PetUpdatePage = () => {
  return (
    <>
      <p>
        우리 강아지 정보를 <br />
        수정해주세요.
      </p>
      <form>
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
        <label>
          성별 <br />
          <input type="radio" name="gender" value="w" defaultChecked />
          여아
          <input type="radio" name="gender" value="m" />
          남아
        </label>
        <br />
        <label>
          중성화 수술 여부 <br />
          <input type="radio" name="neutered" value="false" defaultChecked />
          안했어요
          <input type="radio" name="neutered" value="true" />
          했어요
        </label>
        <br />
        <label>
          몸무게(kg) <br />{' '}
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
        <input type="submit" name="submit" value="전송" />
      </form>
    </>
  );
};

export default PetUpdatePage;
