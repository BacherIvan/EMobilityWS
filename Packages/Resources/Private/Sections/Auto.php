<!DOCTYPE html>
<html lang="de">
    <div class="EBIL-section__auto" id="c51">
        <div class="EBIL-section__auto-wrap">
            <div class="EBIL-section__auto-headline">
                <span>Telemetriedaten</span>
            </div>
            <div class="EBIL-section__auto-data">
                <div class="EBIL-section__status">
                    <div class="EBIL-section__description">
                        <span>Status:</span>
                    </div>
                    <ul class="EBIL-section__status-params">
                        <li class="EBIL-section__roadColor">
                            <span><b>Linien Farbe:</b></span>
                            <span class="JS-roadColor"></span>
                        </li>
                        <li class="EBIL-section__busStopColor">
                            <span><b>Bushaltestellen Farbe:</b></span>
                            <span class="JS-busStopColor"></span>
                        </li>
                        <li class="EBIL-section__lightMode">
                            <span><b>Licht:</b></span>
                            <span class="JS-lightMode"></span>
                        </li>
                        <li class="EBIL-section__autonomousMode">
                            <span><b>Autonomes Fahren:</b></span>
                            <span class="JS-autonomousMode"></span>
                        </li>
                    </ul>
                </div>
                <div class="EBIL-section__lights">
                    <div class="EBIL-section__description">
                        <span>Lichter:</span>
                    </div>
                    <label class="EBIL-section__switch">
                        <input id="JS-lightSwitch" type="checkbox">
                        <span class="EBIL-section__slider-round"></span>
                    </label>
                </div>
                <div class="EBIL-section__drive">
                    <div class="EBIL-section__description">
                        <span>Fahren:</span>
                    </div>
                    <div class="EBIL-section__directions">
                        <div class="EBIL-section__forwards">
                            <button class="EBIL-section__drive-button JS-driveForwards-button" type="button">
                                <i class="EBIL-icon EBIL-icon--chevUP EBIL-icon--cheveron-up"></i>
                            </button>
                        </div>
                        <div class="EBIL-section__backwards">
                            <button class="EBIL-section__drive-button JS-driveBackwards-button" type="button">
                                <i class="EBIL-icon EBIL-icon--chevDOWN EBIL-icon--cheveron-down"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="EBIL-section__autonomousDriving">
                    <div class="EBIL-section__description">
                        <span>Autonomes Fahren:</span>
                    </div>
                    <label class="EBIL-section__switch">
                        <input id="JS-autonomousSwitch" type="checkbox">
                        <span class="EBIL-section__slider-round"></span>
                    </label>
                </div>
                <div class="EBIL-section__selectRoadColor">
                    <div class="EBIL-section__description EBIL-section__special-description">
                        <span>Linienfarbe:</span>
                    </div>
                    <div class="EBIL-section__dropdown">
                        <input type="checkbox" id="dropdown">
                        <label class="EBIL-section__dropdown-face" for="dropdown">
                            <div class="EBIL-section__dropdown-text">Farbe:</div>
                            <div class="dropdown__arrow"><i class="EBIL-icon EBIL-icon--chevDown EBIL-icon--cheveron-down"></i></div>
                        </label>
                        <ul class="EBIL-section__dropdown-items">
                            <li class="EBIL-section__dropdown-item JS-dropdown-road-item" id="red"><i class="EBIL-icon EBIL-icon--red EBIL-icon--droplet"></i></li>
                            <li class="EBIL-section__dropdown-item JS-dropdown-road-item" id="blue"><i class="EBIL-icon EBIL-icon--blue EBIL-icon--droplet"></i></li>
                            <li class="EBIL-section__dropdown-item JS-dropdown-road-item" id="black"><i class="EBIL-icon EBIL-icon--black EBIL-icon--droplet"></i></li>
                            <li class="EBIL-section__dropdown-item JS-dropdown-road-item" id="green"><i class="EBIL-icon EBIL-icon--green EBIL-icon--droplet"></i></li>
                            <li class="EBIL-section__dropdown-item JS-dropdown-road-item" id="yellow"><i class="EBIL-icon EBIL-icon--yellow EBIL-icon--droplet"></i></li>
                            <li class="EBIL-section__dropdown-item JS-dropdown-road-item" id="white"><i class="EBIL-icon EBIL-icon--white EBIL-icon--droplet"></i></li>
                        </ul>
                        <svg class="EBIL-section__svg">
                            <filter id="goo">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                                <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                                <feBlend in="SourceGraphic" in2="goo" />
                            </filter>
                        </svg>
                    </div>
                </div>
                <div class="EBIL-section__selectBusStopColor">
                    <div class="EBIL-section__description EBIL-section__special-description">
                        <span>Busfarbe:</span>
                    </div>
                    <div class="EBIL-section__dropdown-bus">
                        <input type="checkbox" id="dropdownBus">
                        <label class="EBIL-section__dropdown-bus-face" for="dropdownBus">
                            <div class="EBIL-section__dropdown-bus-text">Farbe:</div>
                            <div class="dropdown__arrow"><i class="EBIL-icon EBIL-icon--chevDown EBIL-icon--cheveron-down"></i></div>
                        </label>
                        <ul class="EBIL-section__dropdown-bus-items">
                            <li class="EBIL-section__dropdown-bus-item JS-dropdown-bus-item" id="red1"><i class="EBIL-icon EBIL-icon--red1 EBIL-icon--droplet"></i></li>
                            <li class="EBIL-section__dropdown-bus-item JS-dropdown-bus-item" id="blue1"><i class="EBIL-icon EBIL-icon--blue1 EBIL-icon--droplet"></i></li>
                            <li class="EBIL-section__dropdown-bus-item JS-dropdown-bus-item" id="black1"><i class="EBIL-icon EBIL-icon--black1 EBIL-icon--droplet"></i></li>
                            <li class="EBIL-section__dropdown-bus-item JS-dropdown-bus-item" id="green1"><i class="EBIL-icon EBIL-icon--green1 EBIL-icon--droplet"></i></li>
                            <li class="EBIL-section__dropdown-bus-item JS-dropdown-bus-item" id="yellow1"><i class="EBIL-icon EBIL-icon--yellow1 EBIL-icon--droplet"></i></li>
                            <li class="EBIL-section__dropdown-bus-item JS-dropdown-bus-item" id="white1"><i class="EBIL-icon EBIL-icon--white1 EBIL-icon--droplet"></i></li>
                        </ul>
                        <svg class="EBIL-section__svg">
                            <filter id="goo">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                                <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                                <feBlend in="SourceGraphic" in2="goo" />
                            </filter>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="EBIL-section__response">
                <div class="EBIL-section__response-err">
                    <span id="JS-REST-Error">Error</span>
                </div>
                <div class="EBIL-section__response-success">
                    <span id="JS-REST-Success">Success</span>
                </div>
            </div>
        </div>
    </div>
</html>
