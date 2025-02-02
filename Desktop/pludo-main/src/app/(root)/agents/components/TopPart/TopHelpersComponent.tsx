import Image from 'next/image'
import { teamMembers } from './Data'


export default function TopHelpersComponent() {
  return (
    <main className="bg-custom-gradient ">
   

      {/* Team Section */}
      <section className="max-w-7xl mx-auto pt-32  px-4">
        <h3 className={`text-3xl font-bold  text-white `}  style={{ fontFamily: 'cursive' }}>
                Top Agents
              </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 mt-8 lg:grid-cols-5 gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="flex flex-col items-center text-center">
              <div className="relative w-full aspect-square mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className={`text-3xl font-bold mb-2 ${member.color}`}  style={{ fontFamily: 'cursive' }}>
                {member.name}
              </h3>
              <p className=" text-white">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

