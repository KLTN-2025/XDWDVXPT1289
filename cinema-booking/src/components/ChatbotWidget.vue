<template>
  <div class="fixed bottom-4 right-4 z-50">
    <div v-if="!isOpen" class="flex flex-col items-end gap-2">
      <Button
        @click="isOpen = true"
        size="lg"
        class="rounded-full h-14 w-14 bg-primary hover:bg-primary/90 shadow-lg"
      >
        <MessageCircle class="h-6 w-6" />
      </Button>
    </div>
    
    <div v-else class="flex flex-col items-end gap-2">
      <div class="bg-card border border-border rounded-lg shadow-lg w-80 h-96 flex flex-col">
        <div class="flex items-center justify-between p-4 border-b border-border">
          <div class="flex items-center gap-2">
            <MessageCircle class="h-5 w-5 text-primary" />
            <span class="font-semibold">Trợ lý CineMax</span>
          </div>
          <Button variant="ghost" size="icon" @click="isOpen = false" class="h-8 w-8">
            <X class="h-4 w-4" />
          </Button>
        </div>
        
        <div class="flex-1 p-4 overflow-y-auto">
          <div class="space-y-3">
            <div class="bg-muted rounded-lg p-3 text-sm">
              <p>Xin chào! Tôi có thể giúp bạn:</p>
              <ul class="mt-2 space-y-1 text-xs text-muted-foreground">
                <li>• Tìm phim đang chiếu</li>
                <li>• Hướng dẫn đặt vé</li>
                <li>• Giải đáp thắc mắc</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="p-4 border-t border-border">
          <div class="flex gap-2">
            <input
              v-model="message"
              @keyup.enter="sendMessage"
              placeholder="Nhập tin nhắn..."
              class="flex-1 px-3 py-2 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button @click="sendMessage" size="sm">
              <Send class="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MessageCircle, X, Send } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

const isOpen = ref(false)
const message = ref('')

const sendMessage = () => {
  if (message.value.trim()) {
    // Handle message sending logic here
    console.log('Sending message:', message.value)
    message.value = ''
  }
}
</script>
