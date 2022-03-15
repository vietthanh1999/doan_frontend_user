import Header from './Header'
import Footer from './Footer'
import React, {Component} from 'react'

export default function Layout() {
    return (
        <div>
            <Header/>
            {this.props.children}
            <Footer/>
        </div>
    )
}