<template>
  <button
    :class="buttonClasses"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg'
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default'
})

const buttonClasses = computed(() => {
  const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50"
  
  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    destructive: 'bg-destructive text-white hover:bg-destructive/90',
    outline: 'border bg-background hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline'
  }
  
  const sizeClasses = {
    default: 'h-9 px-4 py-2',
    sm: 'h-8 rounded-md gap-1.5 px-3',
    lg: 'h-10 rounded-md px-6',
    icon: 'size-9',
    'icon-sm': 'size-8',
    'icon-lg': 'size-10'
  }
  
  return cn(
    baseClasses,
    variantClasses[props.variant],
    sizeClasses[props.size],
    props.class
  )
})
</script>
