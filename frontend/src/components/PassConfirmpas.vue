<template>
    <div class="reset-password-container">
      <h1>Reset Password</h1>
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your new password"
            v-bind="passwordAttrs"
          />
          <span v-if="errors.password">{{ errors.password }}</span>
        </div>
  
        <div class="form-group">
          <label for="confirmpassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmpassword"
            v-model="confirmpassword"
            placeholder="Confirm your new password"
            v-bind="confirmpasswordAttrs"
          />
          <span v-if="errors.confirmpassword">{{ errors.confirmpassword }}</span>
        </div>
  
        <button type="submit">Reset Password</button>
      </form>
      <p style="color: red; font-size: 16px;">{{ mainerror }}</p>
      <router-link to="/">Back to Login</router-link>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useForm } from 'vee-validate';
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import * as yup from 'yup';
  
  const schema = yup.object({
    password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
    confirmpassword: yup.string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });
  
  const { handleSubmit, errors, defineField } = useForm({
    validationSchema: schema,
    initialValues: {
      password: '',
      confirmpassword: '',
    }
  });
  
  const [password, passwordAttrs] = defineField('password');
  const [confirmpassword, confirmpasswordAttrs] = defineField('confirmpassword');
  
  const router = useRouter();
  const mainerror = ref('');
  const token = ref('');
  
  onMounted(() => {
    const urlParams = new URLSearchParams(window.location.search);
    token.value = urlParams.get('token') || ''; // Get the token from URL query
  });
  
  const onSubmit = handleSubmit(async (values) => {
      let response = await fetch("http://localhost:3000/auth/reset-password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password:values.password, token: token.value }), // Include the token in the request
      });
  
      let data = await response.json();

      if (data.statusCode === 200) {
          mainerror.value = 'Your password has been reset successfully.';
          router.push('/');
        } else {
            mainerror.value = data.message || 'An error occurred. Please try again.';
      }
  });
  </script>
  
  <style scoped>
  .reset-password-container {
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
  