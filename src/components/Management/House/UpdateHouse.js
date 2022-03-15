import React, {useContext, useEffect, useRef, useState} from 'react'
import '../../../css/Host.css';
import { Container, Row, Col } from 'react-bootstrap';
import { BiMap } from "react-icons/bi";
import { BsChevronLeft, BsChevronRight, BsFillImageFill, BsImages } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import API, { endpoints, addressAPI } from '../../Config/Api'
import cookie from 'react-cookies';
import {Link} from 'react-router-dom'
import { useParams } from 'react-router-dom';


function UpdateHouse() {
    let navigate = useNavigate();

    let { id } = useParams();

    const [choseImage, setChoseImage] = useState(undefined)

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
        name: ""
    })

    const [address, setAddress] = useState({
        country: "",
        city: "",
        district: "",
        ward: "",
        street: ""
    })

    const [apiAddress, setApiAddress] = useState({
        city: [],
        district: [],
        ward: [],
        street: []
    })


    const [hide, setHide] = useState({
        uhImage: false,
        uhName: false,
        uhDescription: false,
        uhAddress: false,
        uhTypeHouse: false,
        uhPrice: false
    })

    let  token = { 
        headers: {
            "Authorization": `Bearer ${cookie.load("access_token")}`} 
    }

    useEffect(() => {
        API.get(`houses/${id}`).then((response)=> {
            setHouse(response.data)
            let addressArr = response.data.address.split(', ')
            setAddress({city: addressArr[3], district: addressArr[2], ward: addressArr[1], street: addressArr[0]})

            addressAPI.get().then((response)=> {
                for (let i=0; i < response.data.length; i++) {
                    if (response.data[i].name == addressArr[3]) {
                        for(let j=0; j < response.data[i].districts.length; j++){
                            if (response.data[i].districts[j].name == addressArr[2]) {
                                setApiAddress({...apiAddress, ward: response.data[i].districts[j].wards, district: response.data[i].districts, city: response.data})
                            }
                        }
                    }
                }
            }).catch((error) =>{
            })

        }).catch((error) =>{
        })

    },[])

    const reduceNumber = (e) => {

        let typeDataNumber = e.target.getAttribute("data-index")
        switch(typeDataNumber) {
            case "1":
                if (house.guest == 1)
                    break;
                setHouse({...house, guest: house.guest-1})
                break;
            case "2":
                if (house.bed == 1)
                    break;
                setHouse({...house, bed: house.bed-1})
                break;
            case "3":
                if (house.bed_room == 1)
                    break;
                setHouse({...house, bed_room: house.bed_room-1})
                break;
            case "4":
                if (house.bathRoom == 1)
                    break;
                setHouse({...house, bath_room: house.bath_room-1})
                break;
            default:        
          }
        updateInfo()
    }

    const increaseNumber = (e) => {
        let typeDataNumber = e.target.getAttribute("data-index")
        switch(typeDataNumber) {
            case "1":
                setHouse({...house, guest: house.guest+1})
                break;
            case "2":
                setHouse({...house, bed: house.bed+1})
                break;
            case "3":
                setHouse({...house, bed_room: house.bed_room+1})
                break;
            case "4":
                setHouse({...house, bath_room: house.bath_room+1})
                break;
            default:        
          }
        updateInfo()
    }

    const confirmAddress = (e) => {
        if (address.street && address.ward && address.district && address.city)
            setHouse({...house, address: `${address.street}, ${address.ward}, ${address.district}, ${address.city}`})
    }

    const updateInfo = (e) => {
        try {
            console.log(house)
            let formData = new FormData()
            formData.append("name", house.name)
            if (choseImage !== undefined)
                formData.append("image", choseImage)
            formData.append("price", house.price)
            formData.append("type_house_id", house.type_house.id)
            formData.append("description", house.description)
            formData.append("address", house.address)
            formData.append("bed", house.bed)
            formData.append("guest", house.guest)
            formData.append("bed_room", house.bed_room)
            formData.append("bath_room", house.bath_room)
            let res = API.put(`house-update/${id}`, formData, token).then((response) => {
                console.log(response.data)
                
            }).catch((error) => {
    
            });

        } catch(err) {
            console.error(err)
        }
    }

    const selectFile = (event) => {
        setChoseImage(event.target.files[0]);
    };

    const selectCity = (e) => {
        setAddress({...address, city: apiAddress.city[e.target.value].name})
        setApiAddress({...apiAddress, district: apiAddress.city[e.target.value].districts})
        setHouse({...house, address: `${address.street}, ${address.ward}, ${address.district}, ${address.city}`})
    }
    const selectDistrict = (e) => {
        setAddress({...address, district: apiAddress.district[e.target.value].name})
        setApiAddress({...apiAddress, ward: apiAddress.district[e.target.value].wards})
        setHouse({...house, address: `${address.street}, ${address.ward}, ${apiAddress.district[e.target.value].name}, ${address.city}`})
    }
    const selectWard = (e) => {
        setAddress({...address, ward: apiAddress.ward[e.target.value].name})
        setHouse({...house, address: `${address.street}, ${apiAddress.ward[e.target.value].name}, ${address.district}, ${address.city}`})
        console.log(`${address.street}, ${address.ward}, ${address.district}, ${address.city}`)
        console.log(apiAddress.ward[e.target.value].name)
    }

    const selectTypeHouse = (e) => {
        setHouse({...house, type_house: {...house.type_house, id: e.target.value}})
    }



    return (
        <Container className='uh_container'>
            <Row>
                <Col xs={3}>
                    <ul className='uh__tab-menu'>
                        <li>
                            <Link to=''>Chi tiết nhà/phòng cho thuê</Link>
                        </li>
                        <li>
                            <Link to=''>Định giá</Link>
                        </li>
                    </ul>
                </Col>
                <Col>
                    <div className='uh__image'>
                        <div className='uh__tab-info'>
                            <div className='uh__image-label'>Ảnh</div>
                            <button className='edit' onClick={(e) => {setHide({...hide, uhImage: !hide.uhImage})}}>Chỉnh sửa</button>
                        </div>
                        { hide.uhImage && <div className='uh__image-list'>
                            <img src={house.image} className="img__house"></img>
                            <input type="file" multiple className="input__file" onChange={selectFile} />
                        </div> }
                    </div>

                    <div className='uh__info-house'>
                        <div className='uh__label'>Thông tin cơ bản về nhà/phòng cho thuê</div> 
                        <div className='uh__info'>
                            <div className='uh__tab-info '>
                                <p className='delete-margin'>Tiêu đề nhà/phòng cho thuê</p>
                                <button className='edit' onClick={(e) => {setHide({...hide, uhName: !hide.uhName})}}>Chỉnh sửa</button>
                            </div>
                            <p className='uh__label-small'>Hãy đặt tên cho chỗ ở của bạn</p>
                            { hide.uhName && (
                                <div> 
                                <input type="text" placeholder="Tên ngôi nhà của bạn"
                                onChange={e => setHouse({...house, name: e.target.value})} value={house.name}></input>
                                    <div className='uh__button'>
                                        <button className='uh__btn-cancel'>Hủy</button>
                                        <button className='uh__btn-save' onClick={updateInfo}>Lưu</button>
                                    </div>
                                </div> )}
                        </div>

                        <div className='uh__info'>
                            <div className='uh__tab-info'>
                                <p className='delete-margin'>Mô tả nhà/phòng cho thuê</p>
                                <button className='edit' onClick={(e) => {setHide({...hide, uhDescription: !hide.uhDescription})}}>Chỉnh sửa</button>
                            </div>
                            <p className='uh__label-small'>Hãy giúp khách hình dung về cảm giác khi ở chỗ của bạn, bao gồm cả lý do tại sao họ sẽ thích ở đó.</p>
                            { hide.uhDescription && <div>
                                <input type="text" placeholder="Mô tả"
                                onChange={e => setHouse({...house, description: e.target.value})} value={house.description}></input>
                                <div className='uh__button'>
                                    <button className='uh__btn-cancel'>Hủy</button>
                                    <button className='uh__btn-save' onClick={updateInfo}>Lưu</button>
                                </div>
                            </div> }

                        </div>

                        <div className='uh__info'>
                            <div className='uh__tab-info'>
                                <p className='delete-margin'>Giá nhà của bạn</p>
                                <button className='edit' onClick={(e) => {setHide({...hide, uhPrice: !hide.uhPrice})}}>Chỉnh sửa</button>
                            </div>
                            <p className='uh__label-small'>Hãy giúp khách hàng biết được giá nhà họ thuê.</p>
                            { hide.uhPrice && <div>
                                <input type="text" placeholder="Giá nhà"
                                onChange={e => setHouse({...house, price: e.target.value})} value={house.price}></input> $/đêm
                                <div className='uh__button'>
                                    <button className='uh__btn-cancel'>Hủy</button>
                                    <button className='uh__btn-save' onClick={updateInfo}>Lưu</button>
                                </div>
                            </div> }

                        </div>

                        <div className='uh__info'>
                            <div className='uh__guest'>
                                <div>Số lượng khách</div>
                                <div className='uh__right'>
                                    <button onClick={reduceNumber} data-index="1"><BsChevronLeft/></button>
                                    <input type="text" value={house.guest} />
                                    <button onClick={increaseNumber} data-index="1"><BsChevronRight/></button>
                                </div>
                            </div>
                        </div>
                        <div className='uh__info'>
                            <div className='uh__guest'>
                                <div>Số giường</div>
                                <div className='uh__right'>
                                    <button onClick={reduceNumber} data-index="2"><BsChevronLeft/></button>
                                    <input type="text" value={house.bed} />
                                    <button onClick={increaseNumber} data-index="2"><BsChevronRight/></button>
                                </div>
                            </div>
                        </div>
                        <div className='uh__info'>
                            <div className='uh__guest'>
                                <div>Số phòng ngủ</div>
                                <div className='uh__right'>
                                    <button onClick={reduceNumber} data-index="3"><BsChevronLeft/></button>
                                    <input type="text" value={house.bed_room} />
                                    <button onClick={increaseNumber} data-index="3"><BsChevronRight/></button>
                                </div>
                            </div>
                        </div>
                        <div className='uh__info'>
                            <div className='uh__guest'>
                                <div>Số phòng tắm</div>
                                <div className='uh__right'>
                                    <button onClick={reduceNumber} data-index="4"><BsChevronLeft/></button>
                                    <input type="text" value={house.bath_room} />
                                    <button onClick={increaseNumber} data-index="4"><BsChevronRight/></button>
                                </div>
                            </div>
                        </div>
                        
                    </div>

                    <div className='uh__address'>
                        <div className='uh__label'>Vị trí</div> 
                        <div className='uh__info'>
                            <div className='uh__tab-info '>
                                <p className='delete-margin'>Địa chỉ</p>
                                <button className='edit' onClick={(e) => {setHide({...hide, uhAddress: !hide.uhAddress})}}>Chỉnh sửa</button>
                            </div>
                            <p className='uh__label-small'>{house.address}</p>
                            { hide.uhAddress && <div>
                                <select onChange={selectCity}>
                                    <option value="" disabled selected hidden>{address.city}</option>
                                    {apiAddress.city.map((option, index) => (
                                        <option key={index} value={index}>{option.name}</option>
                                    ))}
                                </select>
                                <select onChange={selectDistrict}>
                                    <option value="" disabled selected hidden>{address.district}</option>
                                        {apiAddress.district.map((option, index) => (
                                            <option key={index} value={index}>{option.name}</option>
                                        ))}
                                </select>

                                <select onChange={selectWard}>
                                    <option value="" disabled selected hidden>{address.ward}</option>
                                    {apiAddress.ward.map((option, index) => (
                                        <option key={index} value={index}>{option.name}</option>
                                    ))}
                                </select>

                                <div className='uh__label-address'>Căn hộ, phòng (không bắt buộc)</div>
                                <input type="text" onChange={e => setAddress({...address, street: e.target.value})} value={address.street}></input>

                                <div className='uh__button'>
                                    <button className='uh__btn-cancel'>Hủy</button>
                                    <button className='uh__btn-save' onClick={updateInfo}>Lưu</button>
                                </div>
                            </div> }

                        </div>
                    </div>

                    <div className='uh__house'>
                        <div className='uh__label'>Chỗ ở và phòng</div> 
                        <div className='uh__info'>
                            <div className='uh__tab-info '>
                                <p className='delete-margin'>Loại chỗ ở</p>
                                <button className='edit' onClick={(e) => {setHide({...hide, uhTypeHouse: !hide.uhTypeHouse})}}>Chỉnh sửa</button>
                            </div>
                            <p className='uh__label-small'>Chọn một loại chỗ ở phù hợp nhất với nhà/phòng cho thuê của bạn để đặt ra kỳ vọng cho khách và giúp nhà/phòng cho thuê của bạn xuất hiện phù hợp với tiêu chí tìm kiếm.</p>
                            { hide.uhTypeHouse && <div>
                                <div className='uh__label-address'>Loại nào giống nhà/phòng cho thuê của bạn nhất?</div>
                                <select onChange={selectTypeHouse}>
                                    <option value={house.type_house.id} disabled selected hidden>{house.type_house.name}</option>
                                    <option value="1" >Căn Hộ</option>
                                    <option value="2" >Khách Sạn</option>
                                    <option value="3" >Phòng Trọ</option>
                                </select>
                                <div className='uh__button'>
                                    <button className='uh__btn-cancel'>Hủy</button>
                                    <button className='uh__btn-save' onClick={updateInfo}>Lưu</button>
                                </div>
                            </div> }

                        </div>
                    </div>
                </Col>
            </Row>  
        </Container>
    )
}

export default UpdateHouse