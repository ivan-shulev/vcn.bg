import benchmarkImg from './images/projects/benchmark.jpg';
import capitalFortImg from './images/projects/capital-fort-sofia.jpg';
import osramImg from './images/projects/osram.jpg';
import infinityTowerImg from './images/projects/infinity-tower.jpg';
import vMwareImg from './images/projects/vmware.jpg';
import sanStefanoImg from './images/projects/san-stefano-sofia.jpg';
import novotelImg from './images/projects/novotel.jpg';
import rnmImg from './images/projects/r&m-sofia.jpg';
import serdicaImg from './images/projects/serdica-center.jpg';
import litexTowerImg from './images/projects/litex-tower-project.jpg';
import centillionImg from './images/projects/centillion.jpg';
import pravecImg from './images/projects/hotel-riu-pravec.jpg';
import sofiaAirportTowerImg from './images/projects/sofia-airport-tower.jpg';
import megaParkImg from './images/projects/sofia-megapark.jpg';
import radugaImg from './images/projects/radoga-kamchiq.jpg';
import residentialParkImg from './images/projects/residential-park-sofia.jpg';
import theMallImg from './images/projects/the-mall-sofia.jpg';

const english = {
    title: 'Completed projects',
    projects: [
        {
            image: capitalFortImg,
            name: 'Capital Fort',
            services: [
                'SKS', 'Access Control', 'Fire alarm systems', 'Surveillance'
            ]
        },
        {
            image: osramImg,
            name: 'Osram',
            services: [
                'SKS', 'Access Control', 'Fire alarm systems', 'Surveillance', 'Public Address systems', 'Systems launch'
            ]
        },
        {
            image: infinityTowerImg,
            name: 'Infinity tower',
            services: [
                'SKS', 'Access Control', 'Fire alarm systems', 'Surveillance', 'Public Address systems', 'Systems launch'
            ]
        },
        {
            image: vMwareImg,
            name: 'VMware',
            services: [
                'SKS'
            ]
        },
        {
            image: sanStefanoImg,
            name: 'San Stefano Plaza',
            services: [
                'BIS', 'SOT', 'Access Control', 'Fire alarm systems', 'Surveillance', 'Public Address systems', 'Systems launch'
            ]
        },
        {
            image: novotelImg,
            name: 'Novotel',
            services: [
                'BIS', 'SOT', 'Access Control', 'Fire alarm systems', 'Surveillance', 'Public Address systems', 'Systems launch'
            ]
        },
        {
            image: rnmImg,
            name: 'R&M Bulgaria',
            services: [
                'Fire alarm systems', 'Public Address systems', 'Systems launch'
            ]
        },
        {
            image: serdicaImg,
            name: 'Serdica Center - offices',
            services: [
                'Access Control', 'Fire alarm systems', 'Surveillance', 'Public Address systems'
            ]
        },
        {
            image: litexTowerImg,
            name: 'Litex Tower',
            services: [
                'Access Control', 'BMS', 'Surveillance', 'SKS', 'Systems launch'
            ]
        },
        {
            image: centillionImg,
            name: 'Centillion',
            services: [
                'Access Control', 'Surveillance', 'SKS', 'Fire alarm systems', 'Systems launch'
            ]
        },
        {
            image: benchmarkImg,
            name: 'Benchmark',
            services: [
                'SKS', 'Access Control', 'Public Address systems', 'Surveillance'
            ]
        },
        {
            image: pravecImg,
            name: 'Hotel Riu Pravets Resort',
            services: [
                'SKS'
            ]
        },
        {
            image: sofiaAirportTowerImg,
            name: 'Sofia Airport Tower',
            services: [
                'SKS', 'Public Address systems'
            ]
        },
        {
            image: megaParkImg,
            name: 'Mega Park Sofia',
            services: [
                'SKS'
            ]
        },
        {
            image: radugaImg,
            name: 'Raduga Kamchia',
            services: [
                'BMS', 'Fire alarm systems'
            ]
        },
        {
            image: residentialParkImg,
            name: 'Residential Park Sofia',
            services: [
                'SKS', 'Surveillance'
            ]
        },
        {
            image: theMallImg,
            name: 'The Mall',
            services: [
                'SKS', 'Fire alarm systems', 'Access Control', 'Public Address systems'
            ]
        }
    ]
};

const bulgarian = {
    title: 'Завършени проекти',
    projects: [
        {
            image: benchmarkImg,
            name: 'Бенчмарк',
            services: [
                'СКС', 'Контрол на достъп', 'Пожароизвестяване', 'Видео наблюдение'
            ]
        },
        {
            image: capitalFortImg,
            name: 'Кепитал Форт',
            services: [
                'СКС', 'Контрол на достъп', 'Пожароизвестяване', 'Видео наблюдение'
            ]
        }
    ]
};

const homeTrans = {
    english,
    bulgarian
}

module.exports = homeTrans;