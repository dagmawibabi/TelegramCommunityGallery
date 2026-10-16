# ✨ Telegram Community Gallery ✨
![Screenshot](/static/Screenshot.jpg)

**[Telegram Community Gallery](https://telegram.dagmawi.dev)** is a platform where users can discover and submit their favorite Telegram channels and groups, creating a vibrant space for community exploration. Whether you're a seasoned Telegram user or just diving into the world of Telegram communities, this platform is designed with you in mind. 😊

### Features 🎉
- **Discover Communities**: Explore a wide range of Telegram channels and groups, curated by fellow users.
- **Submit Your Community**: Share your favorite Telegram communities with the world by submitting them to the gallery.
- **Tagging and Filtering**: Easily find communities that match your interests with powerful tagging and filtering options.
- **Crowdsourced and Open Source**: The platform thrives on community contributions and is completely open source, ensuring transparency and inclusivity.

### Tech Stack 💻
Telegram Community Gallery is built using the following technologies:
- **Frontend**: [SvelteKit](https://kit.svelte.dev/) and [Tailwind](https://tailwindcss.com/)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Component Library**: [Shadcn-Svelte](https://www.shadcn-svelte.com/)
- **Auth, Database, Storage**: [Supabase](https://supabase.com/)

### Local setup
1. Copy `.env.example` to `.env.local` and add your Supabase URL and publishable key.
2. In the Supabase SQL editor, run `supabase/schema.sql` to create the `communities` table, RLS policies, and the `community-images` bucket.
3. In **Authentication → URL Configuration**, set:
   - **Site URL:** `https://telegram.dagmawi.dev`
   - **Redirect URLs:**
     - `https://telegram.dagmawi.dev/auth/callback`
     - `https://telegram.dagmawi.dev/auth/confirm`
     - `https://telegram.dagmawi.dev/**`
     - `http://localhost:5173/auth/callback`
     - `http://localhost:5173/**`
4. Keep the **Email** provider enabled. Sign-in uses Gmail plus a password.
5. `npm install` then `npm run dev`.

Production env vars on the host should include `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_PUBLISHABLE_KEY`, and `PUBLIC_SITE_URL=https://telegram.dagmawi.dev`.

### Getting Started 🚀
To get started with Telegram Community Gallery, simply visit our [Website](https://telegram.dagmawi.dev) and start exploring! If you'd like to contribute to the project or report any issues, check out our [GitHub repository.](https://github.com/dagmawibabi/TelegramCommunityGallery)

### How to Contribute 🤝
We welcome contributions from the community! Follow these steps to contribute:
1. **Fork the Repository**: Fork the Telegram Community Gallery repository to your GitHub account.
2. **Make Changes**: Create a new branch, make your changes, and commit them to your branch.
3. **Create a Pull Request**: Once your changes are ready, create a detailed pull request (PR) explaining the changes you've made.
4. **Review and Iterate**: Collaborate with the maintainers to review and iterate on your changes until they are ready to be merged.
5. **That's it!**: Can't wait to see the wonders you'll be doing.

For more detailed guidelines on contributing, please refer to our contribution guidelines.

### Feedback and Support 💌
Have any questions, suggestions, or need support? Feel free to reach out to us in our discussions tab or [open an issue](https://github.com/dagmawibabi/TelegramCommunityGallery/issues) on GitHub. Your feedback helps us make Telegram Community Gallery even better!

### License 📝
Telegram Community Gallery is licensed under the [MIT License](https://github.com/dagmawibabi/TelegramCommunityGallery?tab=MIT-1-ov-file).

### Thank You and Enjoy! 🥰