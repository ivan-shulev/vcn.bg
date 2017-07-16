import benchmarkImg from './images/projects/benchmark.jpg';

const englishProjects = [
    {
        image: benchmarkImg,
        name: 'Benchmark',
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
    }
];

const projects = {
    english: englishProjects,
    bulgarian: bulgarianProjects
}

module.exports = projects;