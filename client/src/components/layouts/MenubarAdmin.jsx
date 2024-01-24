import React from 'react'
import { Link } from 'react-router-dom'

const MenubarAdmin = () => {
    return (
        <nav>
            <ul className="nav flex-column">
            <li className='nav-item'>
                    <Link style={{textDecoration:"none"}} to="/admin/index">เเดชบอร์ด</Link>
                </li>
                <li className='nav-item'>
                    <Link style={{textDecoration:"none"}} to="/admin/manage-admin">จัดการผู้ใช้งาน</Link>
                </li>
            </ul>
        </nav>
      )
    }

export default MenubarAdmin