# Use the official bun image as the base image
FROM jarredsumner/bun:edge

# Set the working directory
WORKDIR /app

# Copy the package.json, bun.lockb, and other necessary files
COPY package.json bun.lockb ./

# Install dependencies using bun
RUN bun install

# Copy the rest of the application code
COPY . .

# Build the SvelteKit app
RUN bun run build

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["bun", "run", "preview"]
