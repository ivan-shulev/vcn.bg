import benchmarkImg from './images/projects/benchmark.jpg';
import capitalFortImg from './images/projects/capital-fort-sofia.jpg';

const english = {
    title: 'Completed projects',
    projects: [
        {
            image: benchmarkImg,
            name: 'Benchmark',
            services: [
                'SKS', 'Access Control', 'Fire alarm systems', 'Surveillance'
            ]
        },
        {
            image: capitalFortImg,
            name: 'Capital Fort',
            services: [
                'SKS', 'Access Control', 'Fire alarm systems', 'Surveillance'
            ]
        },
        {
            image: capitalFortImg,
            name: 'Capital Fort',
            services: [
                'SKS', 'Access Control', 'Fire alarm systems', 'Surveillance'
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