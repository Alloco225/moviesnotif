<template>
<!-- Contenu du site -->
    <main id="app">
        <h1 class="text-center text-xl capitalize">Site de notation de film</h1>

        <!-- Liste de films -->
        <div class="my-10 mx-auto p-2 md:p-0 md:w-11/12 lg:w-10/12 xl:w-9/12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <!-- Film -->
            <div v-for="film in films" :key="film.id" class="">
                <router-link :to="'/detail?film_id='+film.id">
                    <div class="relative">
                        <!-- Fond sombre -->
                        <div class="absolute w-full h-full bg-black bg-opacity-20"></div>
                        <!-- Note -->
                        <span class="absolute top-2 right-2 text-white">{{film.vote_average}}</span>
                        <!-- Image -->
                        <img class="w-full h-auto" :src="'http://image.tmdb.org/t/p/w500'+film.poster_path"
                            alt="">
                    </div>
                    <div class="px-2">
                        <!-- Titre -->
                        <h3 class="text-xl font-bold capitalize">{{film.title}}</h3>
                        <!-- Informations -->
                        <div class="flex justify-between">
                            <!-- Date sortie -->
                            <span>{{film.release_date}}</span>
                            <!-- Durée -->
                            <span>120m</span>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </main>
</template>


<script>
import * as mongoose from 'mongoose'


export default {
    name: 'IndexPage',
    data() {
        return {
            films: [],
        }
    },
    // Initialisation de l'application
    mounted(){
        // this.fetchMovies();
        this.dbConnect();
    },
    methods: {
        async dbConnect(){
            console.log(">> mongo");
            const url = 'mongodb://127.0.0.1:27017/moviesnotif'
            await mongoose.connect(url, { useNewUrlParser: true })
            const db = mongoose.connection
            db.once('open', _ => {
            console.log('Database connected:', url)
            })

            db.on('error', err => {
            console.error('connection error:', err)
            })
        },
        async fetchMovies(){
            // Appelle l'API de films et récupèrent les films
            fetch('https://api.themoviedb.org/3/movie/popular?api_key=833c4822773bba014b004669626be8c8&language=en-US&page=1')
            .then(async (response)=>{
                var body = await response.text()
                var data = JSON.parse(body)
                this.films = data.results;
                console.log(">> api",
                'http://image.tmdb.org/t/p/w500'+this.films[1].poster_path)
            })
        }
    }
}
</script>
