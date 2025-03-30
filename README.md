# Root Things - Android Rooting Community

A community-driven platform for Android rooting enthusiasts, developers, and users looking to get the most out of their devices. This website provides a space for sharing modules, scripts, kernels, and knowledge about Android customization.

## Features

- **User Authentication**: Secure login and registration system
- **Module Repository**: Browse, upload, and download Android rooting modules
- **Community Forum**: Interact with other Android enthusiasts
- **User Dashboard**: Manage your profile, uploads, and favorites
- **Responsive Design**: Optimized for all devices with dark mode support

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: MongoDB Atlas
- **Storage**: Cloudflare R2
- **Authentication**: NextAuth.js
- **Deployment**: GitHub Pages (current), Custom Domain (planned)

## Getting Started

### Prerequisites

- Node.js 18 or later
- MongoDB Atlas account
- Cloudflare R2 account (for file storage)

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Cloudflare R2
CLOUDFLARE_R2_ENDPOINT=your_r2_endpoint
CLOUDFLARE_R2_ACCESS_KEY_ID=your_r2_access_key
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_r2_secret_key
CLOUDFLARE_R2_BUCKET_NAME=your_r2_bucket_name

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# GitHub OAuth (optional)
GITHUB_ID=your_github_oauth_id
GITHUB_SECRET=your_github_oauth_secret
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/root-things.git
   cd root-things
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment to GitHub Pages

This project is configured for deployment to GitHub Pages using GitHub Actions.

### Setup

1. Push your code to a GitHub repository.

2. In your repository settings, go to "Secrets and variables" > "Actions" and add the following secrets:
   - `MONGODB_URI`
   - `CLOUDFLARE_R2_ENDPOINT`
   - `CLOUDFLARE_R2_ACCESS_KEY_ID`
   - `CLOUDFLARE_R2_SECRET_ACCESS_KEY`
   - `CLOUDFLARE_R2_BUCKET_NAME`
   - `NEXTAUTH_SECRET`
   - `GITHUB_ID` (if using GitHub OAuth)
   - `GITHUB_SECRET` (if using GitHub OAuth)

3. Enable GitHub Pages in your repository settings:
   - Go to "Settings" > "Pages"
   - Set "Source" to "GitHub Actions"

4. Push to the main branch to trigger deployment:
   ```bash
   git push origin main
   ```

5. Your site will be available at `https://yourusername.github.io/repository-name/`

## Future Plans

- Migration to a custom domain
- Enhanced search functionality
- Real-time notifications
- User reputation system
- Analytics dashboard

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- The Android rooting community
- All open-source contributors
