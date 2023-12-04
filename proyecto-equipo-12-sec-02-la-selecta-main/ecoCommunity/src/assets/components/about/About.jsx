import React from "react";
import { Link } from 'react-router-dom';
import './About.css';

function About() {
    return (
        <section className="contenedor">
            <div className="about">
            <Link to="/" className="logo-link"> {/* Agregar Link al Header */}
                    <div className="logo-image2"/>
                </Link>
                
                <div className="texto-somos">
                    <p className="texto-grande">Somos...</p>
                    <p className="lorem-ipsum">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <div className="valores-mision">
                        <div className="mision">
                            <p className="titulo-mision"> Misión</p>
                            <p className="lorem-ipsum-mision">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                        <div className="valores">
                            <p className="titulo-valores">Valores</p>
                            <ul className="lista-valores">
                                <li>Valor 1</li>
                                <li>Valor 2</li>
                                <li>Valor 3</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="imagen">
                <div className="buttons-container">
                    
                    <Link to="/About" className="buttons" >
                    Acerca de
        </Link>
                    <Link to="/contact" className="buttons" >
          Contáctenos
        </Link>
                </div>
            </div>
        </section>
    );
}

export default About;
