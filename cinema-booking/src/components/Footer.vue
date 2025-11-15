<template>
  <footer class="border-t border-border bg-card/50">
    <div class="container mx-auto px-4 py-8">
      <div class="grid gap-8 md:grid-cols-4">
        <div>
          <div class="flex items-center gap-2 text-xl font-bold mb-4">
            <Film class="h-6 w-6 text-primary" />
            <span>CineMax</span>
          </div>
          <p class="text-sm text-muted-foreground">
            Hệ thống đặt vé xem phim hiện đại và tiện lợi nhất Việt Nam.
          </p>
        </div>
        
        <div>
          <h3 class="font-semibold mb-4">Liên kết nhanh</h3>
          <ul class="space-y-2 text-sm text-muted-foreground">
            <li><RouterLink to="/movies" class="hover:text-primary">Phim đang chiếu</RouterLink></li>
            <li><RouterLink to="/seats" class="hover:text-primary">Chọn ghế</RouterLink></li>
            <li><RouterLink to="/payment" class="hover:text-primary">Thanh toán</RouterLink></li>
            <li><RouterLink to="/admin" class="hover:text-primary">Quản trị</RouterLink></li>
          </ul>
        </div>
        
        <div>
          <h3 class="font-semibold mb-4">Hỗ trợ</h3>
          <ul class="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" class="hover:text-primary">Trung tâm trợ giúp</a></li>
            <li><a href="#" class="hover:text-primary">Liên hệ</a></li>
            <li><a href="#" class="hover:text-primary">Điều khoản sử dụng</a></li>
            <li><a href="#" class="hover:text-primary">Chính sách bảo mật</a></li>
          </ul>
        </div>
        
        <div>
          <h3 class="font-semibold mb-4">Theo dõi chúng tôi</h3>
          <div class="flex gap-4">
            <a href="#" class="text-muted-foreground hover:text-primary">
              <Facebook class="h-5 w-5" />
            </a>
            <a href="#" class="text-muted-foreground hover:text-primary">
              <Twitter class="h-5 w-5" />
            </a>
            <a href="#" class="text-muted-foreground hover:text-primary">
              <Instagram class="h-5 w-5" />
            </a>
            <a href="#" class="text-muted-foreground hover:text-primary">
              <Youtube class="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
      
      <div class="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
        <p>&copy; 2024 CineMax. Tất cả quyền được bảo lưu.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Film, Facebook, Twitter, Instagram, Youtube } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
</script>
