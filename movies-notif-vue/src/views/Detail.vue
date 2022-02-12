<template>
    <!-- Contenu du site -->
    <main id="app" class="pt-10 mx-auto md:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12">
        <h1 class="mb-5 text-4xl font-bold text-center">Détails Film</h1>
        <section class="">
            <div class="relative h-56 overflow-hidden rounded-md">
                <div class="absolute w-full h-full bg-black bg-opacity-10"></div>
                <img
                    class="w-full h-auto object-fill"
                    src="https://t2.genius.com/unsafe/240x240/https%3A%2F%2Fimages.genius.com%2F27121d03d1bdef3ea15517e2ad016218.1000x1000x1.png"
                    alt=""
                />
            </div>
            <div class="relative -mt-24 px-10">
                <div class="flex gap-5">
                    <div class="w-3/5 md:w-1/4">
                        <img class="h-52 w-full object-cover" src="https://www.canalolympia.com/wp-content/uploads/2021/10/ACC-AFF-VENOM-240x355.png" alt="" />
                        <div class="text-center">4.5 (12votes)</div>
                    </div>
                    <div class="flex flex-col justify-around w-full">
                        <div class="flex flex-col md:flex-row justify-between pr-5">
                            <h3 class="text-white text-3xl font-semibold">{{film.title}}</h3>
                            <span class="text-white text-lg font-semibold">2021</span>
                        </div>
                        <p class="text-md">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero, animi!</p>
                    </div>
                </div>
                <div class="flex justify-between mt-10">
                    <div class="">
                        <button class="cursor-pointer px-3 py-2 mr-5 rounded shadow border border-green-600 text-white bg-green-500">J'aime</button>
                        <button class="cursor-pointer px-3 py-2 rounded shadow border border-gray-600 bg-gray-500">Je n'aime pas</button>
                    </div>
                    <a href="/index.html" class="cursor-pointer px-3 py-2 rounded shadow border border-gray-600 bg-gray-500">Retour</a>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
export default {
    name: "Detail",
    data() {
        return {
            id: null,
            film: {},
        };
    },
    // Initialisation de l'application
    mounted() {
        this.id = this.$route.query.film_id;
        console.log(this.id);
        this.fetchMovie(this.id);
    },
    methods: {
        async fetchMovie(id_film) {
            // Appelle l'API de films et récupèrent les films
            fetch(`https://api.themoviedb.org/3/movie/${id_film}?api_key=833c4822773bba014b004669626be8c8&language=en-US`).then(async (response) => {
                var body = await response.text();
                var data = JSON.parse(body);

                console.log(data)
                this.film = data;
            });
        },
    },
};
</script>
