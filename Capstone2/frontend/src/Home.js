import React from 'react'

const Home = ({userLoggedIn}) => {
    return (
            <div
                className='p-5 text-center bg-image'
                style={{ backgroundImage: "url('https://cdn.vox-cdn.com/thumbor/Q7GzWpxDEqIUwq46htpHIobxQ-A=/0x0:1200x1200/1820x1213/filters:focal(504x504:696x696):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/66680523/13_shoe_organizer_lede.w700.h700.2x.0.jpg')", 
                height: 500, width:1500}}
            >
                <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
                    <div className='d-flex justify-content-center align-items-center h-100'>
                        <div className='text-white'>
                            <h1 className='mb-3'>ShoeHaven</h1>
                            <br></br><br></br>
                            {!userLoggedIn && <a className='btn btn-outline-light btn-lg' href='/login' role='button'>
                                Click Here To Login
                            </a>}
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Home