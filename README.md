# 🐶 SOS Pet

SOS Pet is a system dedicated to connecting animals rescued from floods with available temporary shelters. We believe that in times of crisis, every life is important, and it is our mission to help ensure that animals at risk find a safe and welcoming place while awaiting their return home or a new beginning.

With SOS Pet, people who rescue animals from floods can quickly find nearby shelters with available spaces, obtaining crucial information such as capacity, contact details, and location. Our system allows shelters to register and update their information, providing a reliable database for rescuers.

Below is a demo of the application:

![Gif demoing the application](./docs/demo.gif)

## Used Technologies

- Next.js
- React
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- Resend
- Docker
- And much more!

## Local Development

1. Clone the repository
1. Install the dependencies
1. Create a `.env` file based on `.env.example`
1. Ensure all environment variables are filled in
1. Start the database with `docker-compose up -d`
1. Run the migrations with `npx prisma migrate dev`
1. Run the project using the dev script available in `package.json`
