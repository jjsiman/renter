<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import CardContainer from '@/components/CardContainer.vue';
</script>

<template>
    <DefaultLayout :show-footer="true">
        <div class="container-fluid">
            <div class="row">
                <div class="col py-4">
                    <h1 class="text-center display-4 fw-medium">Welcome to Renter</h1>
                    <p class="text-center lead">The most straightforward way to rent a home.</p>
                </div>
            </div>
            <div class="row justify-content-center g-3 pb-4 text-center">
                <div class="col col-sm-3">
                    <CardContainer class="h-100 shadow">
                        <div class="card-body d-flex flex-column">
                            <div class="card-text"><i class="bi-shield-slash-fill text-primary fs-1"></i></div>
                            <div class="card-text w-100">No ads</div>
                        </div>
                    </CardContainer>
                </div>
                <div class="col col-sm-3">
                    <CardContainer class="h-100 shadow">
                        <div class="card-body d-flex flex-column">
                            <div class="card-text"><i class="bi-house-door-fill text-primary fs-1"></i></div>
                            <div class="card-text w-100">Floorplan required</div>
                        </div>
                    </CardContainer>
                </div>
                <div class="col col-sm-3">
                    <CardContainer class="h-100 shadow">
                        <div class="card-body d-flex flex-column">
                            <div class="card-text"><i class="bi-clipboard-check-fill text-primary  fs-1"></i></div>
                            <div class="card-text w-100">Satisfaction guaranteed</div>
                        </div>
                    </CardContainer>
                </div>
            </div>
        </div>
    </DefaultLayout>
</template>
