const logo1 =   <div className="text-3xl icon sun-shower">
                    <div className="cloud"></div>
                    <div className="sun">
                        <div className="rays"></div>
                    </div>
                    <div className="rain"></div>
                </div>
const logo2 =   <div class="text-3xl icon thunder-storm">
                    <div class="cloud"></div>
                    <div class="lightning">
                        <div class="bolt"></div>
                        <div class="bolt"></div>
                    </div>
                </div>
const logo3 =   <div class="text-3xl icon cloudy">
                    <div class="cloud"></div>
                    <div class="cloud"></div>
                </div>
const logo4 =   <div class="text-3xl icon flurries">
                    <div class="cloud"></div>
                    <div class="snow">
                        <div class="flake"></div>
                        <div class="flake"></div>
                    </div>
                </div>
export const buttonStyle = 'animate-bounce mx-4 text-center p-4 rounded-3xl text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700'
export const inputStyle = 'text-center p-4 focus:ring-blue-500 focus:border-blue-500 rounded-3xl'
export const homeImage = <>
                            <div className="h-96">
                                {logo1}{logo2}
                            </div>
                            <div className="h-96">
                                {logo3}{logo4}
                            </div>
                        </>
