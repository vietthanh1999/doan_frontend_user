import React, { useContext, useEffect, useRef, useState } from "react";
import "../../../css/Host.css";
import { Container, Row, Col } from "react-bootstrap";
import { BiMap } from "react-icons/bi";
import {
  BsChevronLeft,
  BsChevronRight,
  BsFillImageFill,
  BsImages,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import API, { endpoints, addressAPI } from "../../Config/Api";
import cookie from "react-cookies";

function CreateHouse() {
  let navigate = useNavigate();

  const [house, setHouse] = useState({
    typeHouse: 0,
    address: "",
    service: {},
    guest: 1,
    bed: 1,
    bathRoom: 1,
    bedRoom: 1,
    image: undefined,
    price: 0,
    name: "",
    description: "",
  });

  const [hide, setHide] = useState({
    chInputAddress: false,
    chAddress: true,
    step1: true,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
    step6: false,
  });

  const [address, setAddress] = useState({
    country: "",
    city: "",
    district: "",
    ward: "",
    street: "",
  });

  const [apiAddress, setApiAddress] = useState({
    city: [],
    district: [],
    ward: [],
    street: [],
  });

  const [step, setStep] = useState(0);

  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [fileInfos, setFileInfos] = useState([]);

  const setTypeHouse = (e) => {
    setHouse({ ...house, typeHouse: e.target.getAttribute("data-index") });
  };

  let token = {
    headers: {
      Authorization: `Bearer ${cookie.load("access_token")}`,
    },
  };

  const nextAction = () => {
    switch (step) {
      case 0:
        setHide({ ...hide, step1: false, step2: true });
        setStep(step + 1);
        break;
      case 1:
        setHide({ ...hide, step2: false, step3: true });
        setStep(step + 1);
        break;
      case 2:
        setHide({ ...hide, step3: false, step4: true });
        setStep(step + 1);
        break;
      case 3:
        setHide({ ...hide, step4: false, step5: true });
        setStep(step + 1);
        break;
      case 4:
        setHide({ ...hide, step5: false, step6: true });
        setStep(step + 1);
        break;
      case 5:
        try {
          let formData = new FormData();
          formData.append("name", house.name);
          formData.append("image", house.image);
          formData.append("price", house.price);
          formData.append("type_house_id", house.typeHouse);
          formData.append("description", house.description);
          formData.append("address", house.address);
          formData.append("bed", house.bed);
          formData.append("guest", house.guest);
          formData.append("bed_room", house.bedRoom);
          formData.append("bath_room", house.bathRoom);
          console.log(formData.name);
          let res = API.post(endpoints["house-for-rent"], formData, token)
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {});
        } catch (err) {
          console.error(err);
        }
        navigate("/rental-house-manager");
        break;
      default:
    }
    console.log(step);
    console.log("Tạo nhà mới thành công");
  };

  const prevAction = () => {
    switch (step) {
      case 1:
        setHide({ ...hide, step1: true, step2: false });
        setStep(step - 1);
        break;
      case 2:
        setHide({ ...hide, step2: true, step3: false });
        setStep(step - 1);
        break;
      case 3:
        setHide({ ...hide, step3: true, step4: false });
        setStep(step - 1);
        console.log(house);
        break;
      case 4:
        setHide({ ...hide, step3: true, step4: false });
        setStep(step - 1);
        console.log(house);
        break;
      case 5:
        setHide({ ...hide, step4: true, step5: false });
        setStep(step - 1);
        console.log(house);
        break;
      default:
    }
  };

  useEffect(() => {
    addressAPI
      .get()
      .then((response) => {
        console.log(response);
        setApiAddress({ ...apiAddress, city: response.data });
      })
      .catch((error) => {});
  }, []);

  const confirmAddress = (e) => {
    if (address.street && address.ward && address.district && address.city)
      setHouse({
        ...house,
        address: `${address.street}, ${address.ward}, ${address.district}, ${address.city}`,
      });
    setHide({
      ...hide,
      chInputAddress: !hide.chInputAddress,
      chAddress: !hide.chAddress,
    });
    console.log(hide.chAddress, hide.chInputAddress);
    console.log(step);
  };

  const reduceNumber = (e) => {
    let typeDataNumber = e.target.getAttribute("data-index");
    switch (typeDataNumber) {
      case "1":
        if (house.guest == 1) break;
        setHouse({ ...house, guest: house.guest - 1 });
        break;
      case "2":
        if (house.bed == 1) break;
        setHouse({ ...house, bed: house.bed - 1 });
        break;
      case "3":
        if (house.bedRoom == 1) break;
        setHouse({ ...house, bedRoom: house.bedRoom - 1 });
        break;
      case "4":
        if (house.bathRoom == 1) break;
        setHouse({ ...house, bathRoom: house.bathRoom - 1 });
        break;
      default:
    }
  };

  const increaseNumber = (e) => {
    let typeDataNumber = e.target.getAttribute("data-index");
    switch (typeDataNumber) {
      case "1":
        setHouse({ ...house, guest: house.guest + 1 });
        break;
      case "2":
        setHouse({ ...house, bed: house.bed + 1 });
        break;
      case "3":
        setHouse({ ...house, bedRoom: house.bedRoom + 1 });
        break;
      case "4":
        setHouse({ ...house, bathRoom: house.bathRoom + 1 });
        break;
      default:
    }
  };

  // image
  const selectFile = (event) => {
    setHouse({ ...house, image: event.target.files[0] });
  };

  const selectCity = (e) => {
    setAddress({ ...address, city: apiAddress.city[e.target.value].name });
    setApiAddress({
      ...apiAddress,
      district: apiAddress.city[e.target.value].districts,
    });
  };
  const selectDistrict = (e) => {
    setAddress({
      ...address,
      district: apiAddress.district[e.target.value].name,
    });
    setApiAddress({
      ...apiAddress,
      ward: apiAddress.district[e.target.value].wards,
    });
  };
  const selectWard = (e) => {
    setAddress({ ...address, ward: apiAddress.ward[e.target.value].name });
  };

  return (
    <Container className="ch__container">
      <Row>
        <Col className="ch__left">
          <div>
            {hide.step1 && <label>Bạn sẽ cho thuê loại chỗ ở nào?</label>}
            {hide.step2 && <label>Chỗ ở của bạn nằm ở đâu?</label>}
            {hide.step3 && <label>Bạn muốn chào đón bao nhiêu khách?</label>}
            {hide.step4 && (
              <label>Cho khách biết chỗ ở của bạn có những gì?</label>
            )}
            {hide.step5 && <label>Hãy đặt tên cho ngôi nhà của bạn?</label>}
            {hide.step5 && <label>Mô tả thêm về ngôi nhà của bạn?</label>}
          </div>
        </Col>
        <Col className="ch__right">
          {hide.step1 && (
            <div className="type_house">
              <button
                key="1"
                onClick={setTypeHouse}
                className={house.typeHouse == 1 ? "btn__selected" : ""}
                data-index="1"
              >
                Căn hộ
              </button>
              <button
                key="2"
                onClick={setTypeHouse}
                className={house.typeHouse == 2 ? "btn__selected" : ""}
                data-index="2"
              >
                Nhà
              </button>
              <button
                key="3"
                onClick={setTypeHouse}
                className={house.typeHouse == 3 ? "btn__selected" : ""}
                data-index="3"
              >
                Khách sạn
              </button>
            </div>
          )}

          {hide.step2 && hide.chInputAddress && (
            <div className="ch__input-address">
              <BiMap className="icon__map" />{" "}
              <input
                type="text"
                placeholder="Địa chỉ của bạn"
                onChange={(e) =>
                  setHouse({ ...house, address: e.target.value })
                }
                value={house.address}
              />
            </div>
          )}

          {hide.step2 && hide.chAddress && (
            <form className="ch__address">
              <label>Xác nhận địa chỉ của bạn</label>
              {/* <input type="text" placeholder="Quốc gia"
                                onChange={e => setAddress({...address, country: e.target.value})} value={address.country}
                            /> */}
              {/* <input type="text" placeholder="Thành Phố/Tỉnh"
                                onChange={e => setAddress({...address, city: e.target.value})} value={address.city}
                            /> */}
              <select onChange={selectCity}>
                <option value="" disabled selected hidden>
                  Thành Phố/Tỉnh
                </option>
                {apiAddress.city.map((option, index) => (
                  <option key={index} value={index}>
                    {option.name}
                  </option>
                ))}
              </select>
              {/* <input type="text" placeholder="Quận/Huyện"
                                onChange={e => setAddress({...address, district: e.target.value})} value={address.district}
                            /> */}
              <select onChange={selectDistrict}>
                <option value="" disabled selected hidden>
                  Quận/Huyện
                </option>
                {apiAddress.district.map((option, index) => (
                  <option key={index} value={index}>
                    {option.name}
                  </option>
                ))}
              </select>

              <select onChange={selectWard}>
                <option value="" disabled selected hidden>
                  Phường/Xã
                </option>
                {apiAddress.ward.map((option, index) => (
                  <option key={index} value={index}>
                    {option.name}
                  </option>
                ))}
              </select>
              {/* <input type="text" placeholder="Phường/Xã"
                                onChange={e => setAddress({...address, ward: e.target.value})} value={address.ward}
                            /> */}
              <input
                type="text"
                placeholder="Số nhà - Đường"
                onChange={(e) =>
                  setAddress({ ...address, street: e.target.value })
                }
                value={address.street}
              />
              <button className="btnConfirm" onClick={confirmAddress}>
                Xác nhận
              </button>
            </form>
          )}

          {hide.step3 && (
            <div className="ch__number">
              <div className="info__number">
                <div>Khách</div>
                <button onClick={reduceNumber} data-index="1">
                  <BsChevronLeft />
                </button>
                <input type="text" value={house.guest} />
                <button onClick={increaseNumber} data-index="1">
                  <BsChevronRight />
                </button>
              </div>
              <div className="info__number">
                <div>Giường</div>
                <button onClick={reduceNumber} data-index="2">
                  <BsChevronLeft />
                </button>
                <input type="text" value={house.bed} />
                <button onClick={increaseNumber} data-index="2">
                  <BsChevronRight />
                </button>
              </div>
              <div className="info__number">
                <div>Phòng ngủ</div>
                <button onClick={reduceNumber} data-index="3">
                  <BsChevronLeft />
                </button>
                <input type="text" value={house.bedRoom} />
                <button onClick={increaseNumber} data-index="3">
                  <BsChevronRight />
                </button>
              </div>
              <div className="info__number">
                <div>Phòng tắm</div>
                <button onClick={reduceNumber} data-index="4">
                  <BsChevronLeft />
                </button>
                <input type="text" value={house.bathRoom} />
                <button onClick={increaseNumber} data-index="4">
                  <BsChevronRight />
                </button>
              </div>
            </div>
          )}

          {hide.step4 && (
            <div className="ch__image">
              <div className="info__image">
                <div className="icon__image">
                  <BsImages />
                </div>
                <div className="label__image">Kéo ảnh của bạn vào đây</div>
                <input
                  type="file"
                  multiple
                  className="input__file"
                  onChange={selectFile}
                />
                {/* <button onClick={upload}  data-index="1">Tải lên từ thiết bị của bạn</button> */}
              </div>
            </div>
          )}

          {hide.step5 && (
            <div className="ch__name">
              <div className="info__name">
                <div className="label__name">Đặt tên cho phòng của bạn</div>
                <input
                  type="text"
                  className="input__name "
                  onChange={(e) => setHouse({ ...house, name: e.target.value })}
                ></input>
              </div>
              <div className="info__name">
                <div className="label__name">
                  Giá phòng của bạn là bao nhiêu ?
                </div>
                <input
                  type="text"
                  className="input__price"
                  onChange={(e) =>
                    setHouse({ ...house, price: e.target.value })
                  }
                ></input>
              </div>
            </div>
          )}

          {hide.step6 && (
            <div className="ch__name">
              <div className="info__price">
                <div className="label__name">
                  Mô tả thêm về ngôi nhà của bạn
                </div>
                <textarea
                  type="text"
                  className="textarea__price"
                  onChange={(e) =>
                    setHouse({ ...house, description: e.target.value })
                  }
                ></textarea>
              </div>
            </div>
          )}
        </Col>
      </Row>

      <div className="ch__action">
        {!hide.step1 ? (
          <button className="btnCancel" onClick={prevAction}>
            Quay lại
          </button>
        ) : (
          <></>
        )}
        <button className="btnSave" onClick={nextAction}>
          Tiếp theo
        </button>
      </div>
    </Container>
  );
}

export default CreateHouse;
