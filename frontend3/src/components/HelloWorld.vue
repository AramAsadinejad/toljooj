<template>
  <div>
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
import apiService from '@/services/api';

export default {
  data() {
    return {
      message: ''
    };
  },
  created() {
    apiService.getData()
      .then(response => {
        this.message = response.data.message;
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }
};
</script>

