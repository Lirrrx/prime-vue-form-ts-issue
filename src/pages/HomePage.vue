<template>
  <div>

    <Form v-slot="$form" :resolver @submit="onFormSubmit" :initialValues="initialValues">
      <InputText name="username" type="text" placeholder="Username" fluid />
      <InputText name="password" type="password" placeholder="Password" fluid />
      <Button type="submit" severity="secondary" label="Submit">submit</Button>

      <Message type="info">
        <pre><code>{{ JSON.stringify($form, undefined, 2) }}</code></pre>
      </Message>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import { Form, type FormSubmitEvent } from '@primevue/forms';

import { ref } from 'vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const initialValues = ref({
  username: '',
  password: ''
});

const resolver = zodResolver(
  z.object({
    username: z.string().min(1, { message: 'Username is required.' }),
    password: z
      .string()
      .min(3, { message: 'Minimum 3 characters.' })
      .max(8, { message: 'Maximum 8 characters.' })
      .refine((value) => /[a-z]/.test(value), {
        message: 'Must have a lowercase letter.'
      })
      .refine((value) => /[A-Z]/.test(value), {
        message: 'Must have an uppercase letter.'
      })
      .refine((value) => /d/.test(value), {
        message: 'Must have a number.'
      })
  })
);

const onFormSubmit = (e: FormSubmitEvent) => {
  if (e.valid) {
    toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
  }
};
</script>
