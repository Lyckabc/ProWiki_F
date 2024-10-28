import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLogon } from './utils/Logon';
import Modal from './utils/Modal';
import '../styles/Header.css';

function Header() {
    const { isLoggedIn, handleLogout,writerName,checkLoginStatus} = useLogon();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const menuRef = useRef(null);

    // localStorage의 토큰 변경 감지
    useEffect(() => {
        const handleStorageChange = () => {
            checkLoginStatus();
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [checkLoginStatus]);

    // 컴포넌트 마운트 시 로그인 상태 확인
    useEffect(() => {
        checkLoginStatus();
    }, [checkLoginStatus]);

    // 외부 클릭 감지
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowUserMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // ESC 키로 메뉴 닫기
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === 'Escape') {
                setShowUserMenu(false);
            }
        };

        document.addEventListener('keydown', handleEscKey);
        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, []);

    const onLogoutClick = () => {
        setIsModalOpen(true);
        setShowUserMenu(false);
    };

    const onConfirmLogout = async () => {
        setIsLoggingOut(true);
        // 애니메이션을 위한 지연
        setTimeout(() => {
            handleLogout();
            setIsModalOpen(false);
            setIsLoggingOut(false);
        }, 300);
    };

    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Main Hole</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/bookcase">Bookcase</Link></li>
                    <li><Link to="/calendar">Calendar</Link></li>
                    <li><Link to="/quest">Quest</Link></li>
                    <li><Link to="/arena">Arena</Link></li>
                    <li><Link to="/map">Map</Link></li>
                </ul>
            </nav>
            <div className="user">
                {isLoggedIn ? (
                    <div className={`login-user ${isLoggingOut ? 'logging-out' : ''}`}>
                        <span className="writer-name">{writerName}</span>
                        <div className="user-menu-container" ref={menuRef}>
                            <button 
                                className="user-menu-button"
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                aria-expanded={showUserMenu}
                                aria-haspopup="true"
                            >
                                My Menu
                            </button>
                            {showUserMenu && (
                                <div 
                                    className="user-menu-dropdown"
                                    role="menu"
                                    aria-orientation="vertical"
                                >
                                    <Link 
                                        to="/user" 
                                        className="menu-item"
                                        role="menuitem"
                                        onClick={() => setShowUserMenu(false)}
                                    >
                                        내 정보
                                    </Link>
                                    <button 
                                        onClick={onLogoutClick}
                                        className="menu-item logout-button"
                                        role="menuitem"
                                    >
                                        로그아웃
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="customer-user">
                        <button>
                            <Link to="/login" className='user-menu'>
                                Login
                            </Link>
                        </button>
                    </div>
                )}
            </div>

            {/* 로그아웃 확인 모달 */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="modal-header">
                    로그아웃 확인
                </div>
                <div className="modal-body">
                    정말 로그아웃 하시겠습니까?
                </div>
                <div className="modal-footer">
                    <button 
                        className="modal-button confirm"
                        onClick={onConfirmLogout}
                    >
                        확인
                    </button>
                    <button 
                        className="modal-button cancel"
                        onClick={() => setIsModalOpen(false)}
                    >
                        취소
                    </button>
                </div>
            </Modal>
        </header>
    );
}

export default Header;