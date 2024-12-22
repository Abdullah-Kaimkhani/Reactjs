import React from "react";
import styles from "../Footer/Footer.module.css"

const Footer = () => {
    return (
        <footer className="bg-dark text-light pt-5 pb-3">
            <div className="container">
                {/* Top Footer Sections */}
                <div className="row">
                    {/* Recommended Section */}
                    <div className="col-md-2">
                        <h6 className="fw-bold mb-4">Recommended</h6>
                        <ul className="list-unstyled">
                            <li><a href="#" className={`${styles.customFont} text-light text-decoration-none mb-2 d-block`}>realme C75</a></li>
                            <li><a href="#" className={`${styles.customFont} text-light text-decoration-none mb-2 d-block`}>realme 13+ 5G</a></li>
                            <li><a href="#" className={`${styles.customFont} text-light text-decoration-none mb-2 d-block`}>realme Note 60</a></li>
                            <li><a href="#" className={`${styles.customFont} text-light text-decoration-none mb-2 d-block`}>realme C61</a></li>
                            <li><a href="#" className={`${styles.customFont} text-light text-decoration-none mb-2 d-block`}>realme C65</a></li>
                            <li><a href="#" className={`${styles.customFont} text-light text-decoration-none mb-2 d-block`}>realme 12</a></li>
                            <li><a href="#" className={`${styles.customFont} text-light text-decoration-none mb-2 d-block`}>realme 12+ 5G</a></li>
                        </ul>
                    </div>

                    {/* Support Section */}
                    <div className="col-md-2">
                        <h6 className="fw-bold mb-4">Support</h6>
                        <ul className="list-unstyled">
                            <li><a href="#" className={`${styles.customFont} text-light text-decoration-none mb-2 d-block`}>FAQ</a></li>
                            <li><a href="#" className={`${styles.customFont} text-light text-decoration-none mb-2 d-block`}>Troubleshooting</a></li>
                        </ul>
                    </div>

                    {/* About realme Section */}
                    <div className="col-md-2">
                        <h6 className="fw-bold mb-4">About realme</h6>
                        <ul className="list-unstyled">
                            <li><a href="#" className={`${styles.customFont} text-light text-decoration-none mb-2 d-block`}>Our Brand</a></li>
                            <li><a href="#" className={`${styles.customFont} text-light text-decoration-none mb-2 d-block`}>Newsroom</a></li>
                        </ul>
                    </div>

                    {/* Contact realme Section */}
                    <div className="col-md-3">
                        <h6 className="fw-bold mb-4">Contact realme</h6>
                        <ul className="list-unstyled">
                            <li><a href="#" className={`${styles.customFont} text-light text-decoration-none mb-2 d-block`}>Whatsapp</a></li>
                            <li><a href="mailto:service.pk@realme.com" className={`${styles.customFont} text-light text-decoration-none mb-2 d-block`}>service.pk@realme.com</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <p className=" fw-bold fs-5">04238048018</p>
                        <p className={`${styles.customFont} small mb-1`}>09:30 - 18:00, MON - SAT</p>
                        <p className={`${styles.customFont} small text-muted`}>Exclude Holidays</p>
                            <a href="#" className="text-light pe-2"><i className="bi bi-facebook fs-1"></i></a>
                            <a href="#" className="text-light pe-2"><i className="bi bi-twitter fs-1"></i></a>
                            <a href="#" className="text-light pe-2"><i className="bi bi-youtube fs-1"></i></a>
                            <a href="#" className="text-light pe-2"><i className="bi bi-instagram fs-1"></i></a>
                        </div>
                </div>

                {/* Bottom Footer Section */}
                <div className={`${styles.customFont} row mt-5 pt-4 border-top pb-5`}>
                    {/* Left Side */}
                    <div className="col-md-6 d-flex">
                        <p className={`small mb-1`}>Pakistan (English / PKR)</p>
                        <p className="small ps-4">© 2019-2024 realme. All Rights Reserved.</p>
                    </div>
                    {/* Right Side */}
                    <div className="col-md-6 text-md-end">
                        <a href="#" className="text-light text-decoration-none small">User Agreement</a>
                        <span className="mx-2">|</span>
                        <a href="#" className="text-light text-decoration-none small">Privacy Policy</a>
                        <span className="mx-2">|</span>
                        <a href="#" className="text-light text-decoration-none small">Terms of Sales</a>
                        <span className="mx-2">|</span>
                        <a href="#" className="text-light text-decoration-none small">Warranty Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
