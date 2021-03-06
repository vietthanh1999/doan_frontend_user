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
                            <Link to=''>Chi ti???t nh??/ph??ng cho thu??</Link>
                        </li>
                        <li>
                            <Link to=''>?????nh gi??</Link>
                        </li>
                    </ul>
                </Col>
                <Col>
                    <div className='uh__image'>
                        <div className='uh__tab-info'>
                            <div className='uh__image-label'>???nh</div>
                            <button className='edit' onClick={(e) => {setHide({...hide, uhImage: !hide.uhImage})}}>Ch???nh s???a</button>
                        </div>
                        { hide.uhImage && <div className='uh__image-list'>
                            <img src={house.image} className="img__house"></img>
                            <input type="file" multiple className="input__file" onChange={selectFile} />
                        </div> }
                    </div>

                    <div className='uh__info-house'>
                        <div className='uh__label'>Th??ng tin c?? b???n v??? nh??/ph??ng cho thu??</div> 
                        <div className='uh__info'>
                            <div className='uh__tab-info '>
                                <p className='delete-margin'>Ti??u ????? nh??/ph??ng cho thu??</p>
                                <button className='edit' onClick={(e) => {setHide({...hide, uhName: !hide.uhName})}}>Ch???nh s???a</button>
                            </div>
                            <p className='uh__label-small'>H??y ?????t t??n cho ch??? ??? c???a b???n</p>
                            { hide.uhName && (
                                <div> 
                                <input type="text" placeholder="T??n ng??i nh?? c???a b???n"
                                onChange={e => setHouse({...house, name: e.target.value})} value={house.name}></input>
                                    <div className='uh__button'>
                                        <button className='uh__btn-cancel'>H???y</button>
                                        <button className='uh__btn-save' onClick={updateInfo}>L??u</button>
                                    </div>
                                </div> )}
                        </div>

                        <div className='uh__info'>
                            <div className='uh__tab-info'>
                                <p className='delete-margin'>M?? t??? nh??/ph??ng cho thu??</p>
                                <button className='edit' onClick={(e) => {setHide({...hide, uhDescription: !hide.uhDescription})}}>Ch???nh s???a</button>
                            </div>
                            <p className='uh__label-small'>H??y gi??p kh??ch h??nh dung v??? c???m gi??c khi ??? ch??? c???a b???n, bao g???m c??? l?? do t???i sao h??? s??? th??ch ??? ????.</p>
                            { hide.uhDescription && <div>
                                <input type="text" placeholder="M?? t???"
                                onChange={e => setHouse({...house, description: e.target.value})} value={house.description}></input>
                                <div className='uh__button'>
                                    <button className='uh__btn-cancel'>H???y</button>
                                    <button className='uh__btn-save' onClick={updateInfo}>L??u</button>
                                </div>
                            </div> }

                        </div>

                        <div className='uh__info'>
                            <div className='uh__tab-info'>
                                <p className='delete-margin'>Gi?? nh?? c???a b???n</p>
                                <button className='edit' onClick={(e) => {setHide({...hide, uhPrice: !hide.uhPrice})}}>Ch???nh s???a</button>
                            </div>
                            <p className='uh__label-small'>H??y gi??p kh??ch h??ng bi???t ???????c gi?? nh?? h??? thu??.</p>
                            { hide.uhPrice && <div>
                                <input type="text" placeholder="Gi?? nh??"
                                onChange={e => setHouse({...house, price: e.target.value})} value={house.price}></input> $/????m
                                <div className='uh__button'>
                                    <button className='uh__btn-cancel'>H???y</button>
                                    <button className='uh__btn-save' onClick={updateInfo}>L??u</button>
                                </div>
                            </div> }

                        </div>

                        <div className='uh__info'>
                            <div className='uh__guest'>
                                <div>S??? l?????ng kh??ch</div>
                                <div className='uh__right'>
                                    <button onClick={reduceNumber} data-index="1"><BsChevronLeft/></button>
                                    <input type="text" value={house.guest} />
                                    <button onClick={increaseNumber} data-index="1"><BsChevronRight/></button>
                                </div>
                            </div>
                        </div>
                        <div className='uh__info'>
                            <div className='uh__guest'>
                                <div>S??? gi?????ng</div>
                                <div className='uh__right'>
                                    <button onClick={reduceNumber} data-index="2"><BsChevronLeft/></button>
                                    <input type="text" value={house.bed} />
                                    <button onClick={increaseNumber} data-index="2"><BsChevronRight/></button>
                                </div>
                            </div>
                        </div>
                        <div className='uh__info'>
                            <div className='uh__guest'>
                                <div>S??? ph??ng ng???</div>
                                <div className='uh__right'>
                                    <button onClick={reduceNumber} data-index="3"><BsChevronLeft/></button>
                                    <input type="text" value={house.bed_room} />
                                    <button onClick={increaseNumber} data-index="3"><BsChevronRight/></button>
                                </div>
                            </div>
                        </div>
                        <div className='uh__info'>
                            <div className='uh__guest'>
                                <div>S??? ph??ng t???m</div>
                                <div className='uh__right'>
                                    <button onClick={reduceNumber} data-index="4"><BsChevronLeft/></button>
                                    <input type="text" value={house.bath_room} />
                                    <button onClick={increaseNumber} data-index="4"><BsChevronRight/></button>
                                </div>
                            </div>
                        </div>
                        
                    </div>

                    <div className='uh__address'>
                        <div className='uh__label'>V??? tr??</div> 
                        <div className='uh__info'>
                            <div className='uh__tab-info '>
                                <p className='delete-margin'>?????a ch???</p>
                                <button className='edit' onClick={(e) => {setHide({...hide, uhAddress: !hide.uhAddress})}}>Ch???nh s???a</button>
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

                                <div className='uh__label-address'>C??n h???, ph??ng (kh??ng b???t bu???c)</div>
                                <input type="text" onChange={e => setAddress({...address, street: e.target.value})} value={address.street}></input>

                                <div className='uh__button'>
                                    <button className='uh__btn-cancel'>H???y</button>
                                    <button className='uh__btn-save' onClick={updateInfo}>L??u</button>
                                </div>
                            </div> }

                        </div>
                    </div>

                    <div className='uh__house'>
                        <div className='uh__label'>Ch??? ??? v?? ph??ng</div> 
                        <div className='uh__info'>
                            <div className='uh__tab-info '>
                                <p className='delete-margin'>Lo???i ch??? ???</p>
                                <button className='edit' onClick={(e) => {setHide({...hide, uhTypeHouse: !hide.uhTypeHouse})}}>Ch???nh s???a</button>
                            </div>
                            <p className='uh__label-small'>Ch???n m???t lo???i ch??? ??? ph?? h???p nh???t v???i nh??/ph??ng cho thu?? c???a b???n ????? ?????t ra k??? v???ng cho kh??ch v?? gi??p nh??/ph??ng cho thu?? c???a b???n xu???t hi???n ph?? h???p v???i ti??u ch?? t??m ki???m.</p>
                            { hide.uhTypeHouse && <div>
                                <div className='uh__label-address'>Lo???i n??o gi???ng nh??/ph??ng cho thu?? c???a b???n nh???t?</div>
                                <select onChange={selectTypeHouse}>
                                    <option value={house.type_house.id} disabled selected hidden>{house.type_house.name}</option>
                                    <option value="1" >C??n H???</option>
                                    <option value="2" >Kh??ch S???n</option>
                                    <option value="3" >Ph??ng Tr???</option>
                                </select>
                                <div className='uh__button'>
                                    <button className='uh__btn-cancel'>H???y</button>
                                    <button className='uh__btn-save' onClick={updateInfo}>L??u</button>
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