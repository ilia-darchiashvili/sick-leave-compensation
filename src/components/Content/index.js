import * as React from 'react';
import { Image } from 'react-bootstrap';
import infoImage from '../../assets/images/infoImage.png';
import './index.scss';

const Content = () => {
    return (
        <div className='content-wrapper'>
            <div className='top-info'>
                <h1 className='top-info-header'>
                    Quam Tristique Condimentum
                </h1>
                <p className='top-info-text'>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
                    eget lacinia odio sem nec elit. Cum sociis natoque penatibus et magnis dis parturient montes,
                    nascetur ridiculus mus. <span>Curabitur blandit</span> tempus porttitor.
                    Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
                    Vestibulum id ligula porta felis euismod semper.
                </p>
            </div>
            <div className='middle-info-wrapper'>
                <div className='middle-info'>
                    <h2 className='middle-info-header'>
                        Fringilla Euismod Adipiscing Ipsum
                    </h2>
                    <p className='middle-info-text'>
                        Cum sociis natoque penatibus et magnis dis parturient montes,
                        nascetur ridiculus mus. Maecenas faucibus mollis interdum.
                        Aenean lacinia bibendum nulla sed.
                    </p>
                </div>
                <div className='middle-image'>
                    <Image src={infoImage} fluid />
                </div>
            </div>
            <div className='bottom-info'>
                <div className='bottom-info-item'>
                    <div className='breakpoint' />
                    <div className='item-text'>
                        Tellus Ullamcorper Inceptos
                    </div>
                </div>
                <div className='bottom-info-item'>
                    <div className='breakpoint nested-breakpoint' />
                    <div className='item-text'>
                        Magna Condimentum
                        <div className='sub-item'>
                            <div className='breakpoint' />
                            <div className='item-text'>
                                Mattis Tristique
                            </div>
                        </div>
                        <div className='sub-item'>
                            <div className='breakpoint' />
                            <div className='item-text'>
                                Pharetra Pellentesque Dapibus
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bottom-info-item'>
                    <div className='breakpoint' />
                    <div className='item-text'>
                        Aenean Inceptos
                    </div>
                </div>
                <div className='bottom-info-item'>
                    <div className='breakpoint' />
                    <div className='item-text'>
                        Parturient Bibendum
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Content;