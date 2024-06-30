<template>
    <footer class="bg-dark text-body" data-bs-theme="dark">
        <div class="container-xxl py-4 sticky-bottom">
            <div class="row">
                <div class="col-6 col-sm-4">
                    <RouterLink class="d-block link-light link-underline-opacity-0" :to="{ name: 'about' }">About
                    </RouterLink>
                    <a class="d-block link-light link-underline-opacity-0"
                        href="https://github.com/jjsiman/renter">Github</a>
                    <a class="d-block link-light link-underline-opacity-0"
                        href="https://www.linkedin.com/in/johnjsiman/">LinkedIn</a>
                </div>
                <div class="col-6 col-sm-4 offset-sm-4">
                    <div class="text-end">Created by Jack Siman</div>
                </div>
            </div>
        </div>
    </footer>
</template>
