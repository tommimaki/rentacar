import React from 'react';

const About = () => {
    return (
        <div className=" px-4 py-12 md:px-12 md:py-24 bg-gray-100">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Tietoa meistä</h2>
            <div className="max-w-5xl mx-auto text-lg text-gray-700">
                <p className="mb-6">
                    Tarjoamme ylellisiä vuokra-autoja asiakkaillemme, jotka haluavat matkustaa tyylikkäästi ja mukavasti. Meiltä löydät laadukkaat autot, joilla voit matkustaa yksin, kaksin tai ryhmässä.
                </p>
                <p className="mb-6">
                    Meillä on laaja valikoima ajoneuvoja eri kategorioissa, joten voit valita juuri sinulle sopivan auton. Huolehdimme siitä, että autot ovat aina hyvin huollettuja ja siistejä, jotta voit nauttia matkastasi huolettomasti.
                </p>
                <p className="mb-6">
                    Ota yhteyttä, jos haluat vuokrata ylellisen auton ja matkustaa tyylikkäästi ja mukavasti kohteeseesi!
                </p>
            </div>
        </div>
    );
};

export default About;
