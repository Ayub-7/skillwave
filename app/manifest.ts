import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'SkillWave - Course Creation Platform',
        short_name: 'SkillWave',
        description: 'Create, sell, and manage online courses with SkillWave. The easiest platform for course creators.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0ea5e9',
        icons: [
            {
                src: '/logo.png',
                sizes: 'any',
                type: 'image/png',
            },
        ],
    };
} 