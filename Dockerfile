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
Run npm install react-chartjs-2
Run npm install chartjs-plugin-datalabels
RUN npm install react-draggable
Run npm install react-confetti
Run npm install lodash
Run npm install react-tooltip
Run npm install react-icon@latest
Run npm install  @react-spring/web @nivo/pie @nivo/bar @nivo/line @nivo/core @nivo/axes d3
Run npm install html-to-image


# Copy the rest of the app
COPY . .

# Ensure vite and other executables have execute permissions
RUN chmod +x node_modules/.bin/*

# Run the build (this creates /app/dist)
RUN npm run build

# Stage 2: Serve the frontend with a lightweight server
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for Nginx
EXPOSE 5174

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
