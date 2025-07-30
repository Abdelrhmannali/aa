<template>
  <div class="row m-0 min-vh-100 bg-light">
    <!-- Sidebar Tickets -->
    <div class="col-md-4 p-4 border-end bg-white">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="fw-bold mb-0">Recent Tickets</h5>
        <button class="btn btn-primary rounded-circle p-2">
          <i class="bi bi-plus-lg"></i>
        </button>
      </div>
      
      <div class="position-relative mb-3">
        <input 
          type="text" 
          class="form-control ps-5" 
          placeholder="Search here..." 
          style="border-radius: 25px; background-color: #f8f9fa;"
        />
        <i class="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
        <button class="btn btn-outline-secondary position-absolute top-50 end-0 translate-middle-y me-2 p-1" style="border: none;">
          <i class="bi bi-funnel"></i>
        </button>
      </div>
      
      <div v-for="ticket in recentTickets" :key="ticket.id" 
           class="d-flex align-items-start p-3 rounded mb-2 ticket-item border" 
           @click="goToDetails(ticket.id)" 
           style="cursor:pointer; background-color: #f8f9fa;">
        <div class="avatar me-3">{{ ticket.client.name.charAt(0).toUpperCase() }}</div>
        <div class="flex-grow-1">
          <div class="fw-bold">{{ ticket.client.name }}</div>
          <div class="text-muted small mb-2">{{ formatDateTime(ticket.created_at) }}</div>
          <div class="small text-truncate mb-2">{{ ticket.description }}</div>
          <div class="d-flex gap-1 flex-wrap">
            <span class="badge bg-success" v-if="ticket.status === 'open'">Open</span>
            <span class="badge bg-danger" v-if="ticket.priority === 'high'">High Priority</span>
            <span class="badge bg-warning text-dark">{{ ticket.ticket_type }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Ticket Details -->
    <div class="col-md-8 p-4 bg-white" v-if="ticket">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h5 class="fw-bold mb-2">{{ ticket.title }}</h5>
          <div class="d-flex gap-2 mb-2">
            <span class="badge bg-success" v-if="ticket.status === 'open'">Open</span>
            <span class="badge bg-danger" v-if="ticket.priority === 'high'">High Priority</span>
            <span class="badge bg-warning text-dark">{{ ticket.ticket_type }}</span>
          </div>
        </div>
        <div class="d-flex align-items-center">
          <div class="company-avatar me-2">
            <i class="bi bi-building"></i>
          </div>
          <span class="fw-semibold">{{ ticket.client.company_name || 'Company Name' }}</span>
          <button class="btn btn-link p-0 ms-3">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
      </div>

      <div class="chat-container">
        <!-- Original Ticket -->
        <div class="d-flex mb-4">
          <div class="avatar me-3">{{ ticket.client.name.charAt(0).toUpperCase() }}</div>
          <div class="flex-grow-1">
            <div class="d-flex align-items-center mb-1">
              <span class="fw-bold me-2">{{ ticket.client.name }}</span>
              <span class="text-muted small">{{ formatDateTime(ticket.created_at) }}</span>
            </div>
            <div class="ticket-content mb-3" v-html="ticket.description"></div>

            <!-- Attachments -->
            <div v-if="ticket.ticket_attachments && JSON.parse(ticket.ticket_attachments).length > 0">
              <div class="text-muted mb-2">{{ JSON.parse(ticket.ticket_attachments).length }} Attachments</div>
              <div class="d-flex gap-2 flex-wrap">
                <div class="attachment-item" v-for="(file, index) in JSON.parse(ticket.ticket_attachments)" :key="index">
                  <div class="d-flex align-items-center p-2 border rounded">
                    <i class="bi bi-file-earmark-pdf text-danger fs-4 me-2" v-if="file.endsWith('.pdf')"></i>
                    <img v-else :src="`http://localhost:8000/storage/${file}`" class="attachment-img me-2" />
                    <div class="flex-grow-1">
                      <div class="fw-semibold">{{ getFileName(file) }}</div>
                      <div class="text-muted small">{{ getFileSize(file) }}</div>
                    </div>
                    <a :href="`http://localhost:8000/storage/${file}`" download class="btn btn-link p-1">
                      <i class="bi bi-download"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Replies -->
        <div v-for="reply in replies" :key="reply.id" class="d-flex mb-4">
          <div class="avatar me-3">{{ reply.user.name.charAt(0).toUpperCase() }}</div>
          <div class="flex-grow-1">
            <div class="d-flex align-items-center mb-1">
              <span class="fw-bold me-2">{{ reply.user.name }}</span>
              <span class="text-muted small">{{ formatDateTime(reply.created_at) }}</span>
            </div>
            <div class="reply-content">{{ reply.message }}</div>
          </div>
        </div>
      </div>

      <!-- Reply Input -->
      <div class="reply-section mt-4 pt-3 border-top">
        <div class="d-flex">
          <div class="avatar me-3">U</div>
          <div class="flex-grow-1">
            <div class="position-relative">
              <textarea 
                class="form-control border-0 shadow-none" 
                placeholder="Type a new message..." 
                rows="3" 
                v-model="newMessage"
                style="resize: none; background-color: transparent;"
              ></textarea>
              <div class="d-flex justify-content-end mt-2">
                <button class="btn btn-primary rounded-pill px-4" @click="submitReply">
                  <i class="bi bi-send me-1"></i> Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty state when no ticket selected -->
    <div class="col-md-8 p-4 bg-white d-flex align-items-center justify-content-center" v-else>
      <div class="text-center text-muted">
        <i class="bi bi-ticket-detailed fs-1 mb-3"></i>
        <h5>Select a ticket to view details</h5>
        <p>Choose a ticket from the sidebar to see its details and conversation</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const ticketId = ref(route.query.id);
const ticket = ref(null);
const replies = ref([]);
const newMessage = ref('');
const recentTickets = ref([]);

watch(() => route.query.id, (newId) => {
  ticketId.value = newId;
  if (newId) {
    fetchTicket();
    fetchReplies();
  }
});

const fetchTicket = async () => {
  try {
    if (!ticketId.value) throw new Error('No ticket ID provided');
    const res = await fetch(`http://localhost:8000/api/tickets/${ticketId.value}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Response is not JSON');
    }
    const data = await res.json();
    ticket.value = data.data;
  } catch (error) {
    console.error('Error fetching ticket:', error);
    ticket.value = null;
  }
};

const fetchReplies = async () => {
  try {
    if (!ticketId.value) throw new Error('No ticket ID provided');
    const res = await fetch(`http://localhost:8000/api/tickets/${ticketId.value}/replies`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Response is not JSON');
    }
    const data = await res.json();
    replies.value = data.data;
  } catch (error) {
    console.error('Error fetching replies:', error);
    replies.value = [];
  }
};

const fetchRecentTickets = async () => {
  try {
    const res = await fetch(`http://localhost:8000/api/tickets`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Response is not JSON');
    }
    const data = await res.json();
    recentTickets.value = data.data;
  } catch (error) {
    console.error('Error fetching recent tickets:', error);
    recentTickets.value = [];
  }
};

const submitReply = async () => {
  if (!newMessage.value.trim()) return;
  try {
    const res = await fetch(`http://localhost:8000/api/tickets/${ticketId.value}/replies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ message: newMessage.value }),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Response is not JSON');
    }
    const data = await res.json();
    if (data.success) {
      replies.value.unshift(data.data);
      newMessage.value = '';
    } else {
      alert(data.message || 'Failed to send reply.');
    }
  } catch (error) {
    console.error('Error submitting reply:', error);
    alert('Failed to send reply.');
  }
};

const goToDetails = (id) => {
  router.push({ name: 'details', query: { id } });
};

const formatDateTime = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

const getFileName = (filePath) => {
  const parts = filePath.split('/');
  return parts[parts.length - 1];
};

const getFileSize = (filePath) => {
  // This would typically come from the server, returning placeholder for now
  return filePath.endsWith('.pdf') ? '29 kB' : '19 kB';
};

onMounted(() => {
  fetchRecentTickets();
  if (ticketId.value) {
    fetchTicket();
    fetchReplies();
  }
});
</script>

<style scoped>
.ticket-item {
  transition: all 0.2s ease;
  cursor: pointer;
}

.ticket-item:hover {
  background-color: #e9ecef !important;
  transform: translateY(-1px);
}

.avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  flex-shrink: 0;
}

.company-avatar {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-container {
  max-height: 60vh;
  overflow-y: auto;
}

.ticket-content, .reply-content {
  line-height: 1.6;
  color: #333;
}

.attachment-item {
  min-width: 200px;
}

.attachment-img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
}

.reply-section {
  background-color: #fafafa;
  border-radius: 12px;
  padding: 16px;
}

.badge {
  font-size: 0.75rem;
  padding: 4px 8px;
}

.form-control:focus {
  box-shadow: none;
  border-color: transparent;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  font-weight: 500;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
  transform: translateY(-1px);
}

/* Custom scrollbar */
.chat-container::-webkit-scrollbar {
  width: 6px;
}

.chat-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.chat-container::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}

.chat-container::-webkit-scrollbar-thumb:hover {
  background: #bbb;
}
</style>