import benchmarkImg from './images/projects/benchmark.jpg';
import capitalFortImg from './images/projects/capital-fort-sofia.jpg';

const englishProjects = [
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
    }
];

const bulgarianProjects = [
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
];

const projects = {
    english: englishProjects,
    bulgarian: bulgarianProjects
}

module.exports = projects;