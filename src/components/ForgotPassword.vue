<template>
    <div class="forgot-password-container">
      <h1>Forgot Password</h1>
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Enter your email"
            v-bind="emailAttrs"
          />
          <span v-if="errors.email">{{ errors.email }}</span>
        </div>
  
        <button type="submit">Send Reset Link</button>
      </form>
      <p style="color: red; font-size: 16px;">{{ mainerror }}</p>
      <router-link to="/">Back to Login</router-link>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useForm } from 'vee-validate';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import * as yup from 'yup';
  
  const schema = yup.object({
    email: yup.string().email('Must be a valid email').required('Email is required'),
  });
  
  const { handleSubmit, errors, defineField } = useForm({
    validationSchema: schema,
    initialValues: {
      email: '',
    }
  });
  
  const [email, emailAttrs] = defineField('email');
  
  const router = useRouter();
  const mainerror = ref('');
  
  const onSubmit = handleSubmit(async (values) => {
    mainerror.value = "Wait...."
      let response = await fetch("http://localhost:3000/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
  
      let data = await response.json();
  
      if (data.statusCode === 200) {
          mainerror.value = 'A reset link has been sent to your email.';
          router.push('/');
      } else {
          mainerror.value = 'Email is not exist in our database';
      }
  });
  </script>
  
  <style scoped>
  .forgot-password-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-top: 100px;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 93%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  span {
    color: red;
    font-size: 12px;
  }
  </style>
  