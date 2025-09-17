# Stage 1: Build the frontend
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install
RUN npm install react-modal
RUN npm install html2canvas qrcode.react react-router-dom
RUN npm install uuid
RUN npm install @react-oauth/google
RUN npm install recharts
RUN npm install react-chartjs-2
RUN npm install chartjs-plugin-datalabels
RUN npm install react-draggable
RUN npm install react-confetti
RUN npm install lodash
RUN npm install react-tooltip
RUN npm install react-icon@latest
RUN npm install  @react-spring/web @nivo/pie @nivo/bar @nivo/line @nivo/core @nivo/axes d3
RUN npm install html-to-image
RUN npm install react-helmet-async
RUN npm install @react-oauth/google axios react-hot-toast react-router-dom
RUN npm install @dnd-kit/sortable @dnd-kit/utilities 
RUN npm install react-grid-layout react-resizable


# Copy the rest of the app
COPY . .

# Ensure vite and other executables have execute permissions
RUN chmod +x node_modules/.bin/*

# RUN the build (this creates /app/dist)
# RUN npm run build
RUN npm run build || { echo 'Build failed'; cat /app/npm-debug.log; exit 1; }

# Stage 2: Serve the frontend with a lightweight server
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for Nginx
EXPOSE 5178

# RUN Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
