import { Upload } from "lucide-react";

export default function GeneralTab({
  profile,
  setProfile,
  handleUpdate,
  handleImageUpload,
  uploading,
  isAboutPage = false,
}) {
  return (
    <div className="max-w-4xl space-y-10 animate-in fade-in pb-20">
      <h2 className="text-4xl font-black">
        {isAboutPage ? "Biography & Education" : "Global Settings"}
      </h2>

      <div className="bg-[#1E293B] p-8 rounded-3xl border border-slate-700 space-y-8 shadow-xl">
        {isAboutPage ? (
          <>
            {/* Photo Section */}
            <div className="flex flex-col md:flex-row items-center gap-8 p-6 bg-[#0F172A] rounded-2xl border border-slate-700">
              <img
                src={profile.photoURL || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-cyan-400/20 shadow-2xl"
              />
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-cyan-400 tracking-widest">
                  Update Photo
                </label>
                <label className="cursor-pointer bg-cyan-400 text-[#0F172A] px-6 py-2 rounded-xl font-black text-[10px] hover:opacity-80 block w-fit transition-all">
                  <Upload size={14} className="inline mr-2" /> BROWSE FILES
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
                {uploading && (
                  <p className="text-cyan-400 text-[10px] animate-pulse">
                    Uploading to Cloudinary...
                  </p>
                )}
              </div>
            </div>

            {/* Education Fields */}
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="School"
                value={profile.school}
                onChange={(e) =>
                  setProfile({ ...profile, school: e.target.value })
                }
              />
              <Input
                label="College"
                value={profile.college}
                onChange={(e) =>
                  setProfile({ ...profile, college: e.target.value })
                }
              />
              <Input
                label="University"
                value={profile.university}
                onChange={(e) =>
                  setProfile({ ...profile, university: e.target.value })
                }
              />
              <Input
                label="Location"
                value={profile.address}
                onChange={(e) =>
                  setProfile({ ...profile, address: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase text-cyan-400 tracking-widest">
                Your Story
              </label>
              <textarea
                className="w-full bg-[#0F172A] border border-slate-700 p-6 rounded-2xl text-white outline-none focus:border-cyan-400 h-64 text-lg"
                value={profile.about}
                onChange={(e) =>
                  setProfile({ ...profile, about: e.target.value })
                }
              />
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <Input
              label="Full Name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
            <Input
              label="Work Title"
              value={profile.title}
              onChange={(e) =>
                setProfile({ ...profile, title: e.target.value })
              }
            />
            <Input
              label="Hero Tagline"
              value={profile.heroSubtitle}
              onChange={(e) =>
                setProfile({ ...profile, heroSubtitle: e.target.value })
              }
            />
          </div>
        )}
        <button
          onClick={() => handleUpdate(profile)}
          className="bg-cyan-400 text-[#0F172A] font-black py-4 px-12 rounded-xl uppercase tracking-widest"
        >
          Save {isAboutPage ? "Profile" : "Global Info"}
        </button>
      </div>
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-[10px] font-black uppercase text-cyan-400 tracking-widest leading-none">
        {label}
      </label>
      <input
        className="bg-[#0F172A] border border-slate-700 p-4 rounded-xl text-white outline-none focus:border-cyan-400 font-medium"
        value={value || ""}
        onChange={onChange}
      />
    </div>
  );
}
