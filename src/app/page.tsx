"use client";

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus(lang === 'ar' ? 'جاري الإرسال...' : 'Sending...');

    const form = e.target as HTMLFormElement;

    // Create an object containing the form data
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    // Google Apps Script Web App URL for contact form submissions
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbyDy-jjL2-Jst1uWQXEhdAKvqbp52lh2MrA9Rpgl-Q3QNBEUK8z6qwpNH9vFPEvOEarRQ/exec';

    try {
      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors', // Critical for preventing the CORS error overlay
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(data)
      });

      // With no-cors, the response is opaque, so we just assume success.
      setFormStatus(lang === 'ar' ? 'تم إرسال رسالتك بنجاح!' : 'Message sent successfully!');
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus(lang === 'ar' ? 'حدث خطأ، يرجى المحاولة مرة أخرى.' : 'Error sending message. Please try again.');
    }

    setTimeout(() => setFormStatus(''), 5000);
  };

  const projectLinks = [
    "https://clinic-two-roan.vercel.app/",
    "https://dareldjazair-wheat.vercel.app/",
    "https://store-sand-eight.vercel.app/",
    "https://archi-dz.vercel.app/",
    "https://agence-de-voiyage.vercel.app/",
    "https://dawaka-food.vercel.app/"
  ];

  return (
    <main className="min-h-screen relative font-sans text-slate-800 bg-white">

      {/* Header */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm border-b border-white/50' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          <a href="#" className="flex items-center shrink-0">
            <img src="/logo.png" alt="Isomorphe Tech Logo" className="h-[80px] lg:h-[100px] w-auto object-contain" />
          </a>

          <nav className="hidden md:flex gap-8">
            <a href="#home" className="font-medium hover:text-[var(--primary-color)] transition-colors">{t('nav_home')}</a>
            <a href="#about" className="font-medium hover:text-[var(--primary-color)] transition-colors">{t('nav_about')}</a>
            <a href="#services" className="font-medium hover:text-[var(--primary-color)] transition-colors">{t('nav_services')}</a>
            <a href="#projects" className="font-medium hover:text-[var(--primary-color)] transition-colors">{t('nav_projects')}</a>
            <a href="#packs" className="font-medium hover:text-[var(--primary-color)] transition-colors">{t('nav_packs')}</a>
            <a href="#contact" className="font-medium hover:text-[var(--primary-color)] transition-colors">{t('nav_contact')}</a>
          </nav>

          <div className="flex items-center gap-6">
            <div className="flex bg-slate-50 p-1 rounded-full">
              <button onClick={() => setLang('en')} className={`px-3 py-1 text-sm font-semibold rounded-full transition-all ${lang === 'en' ? 'bg-white text-[var(--primary-color)] shadow-sm' : 'text-slate-400'}`}>EN</button>
              <button onClick={() => setLang('ar')} className={`px-3 py-1 text-sm font-semibold rounded-full transition-all ${lang === 'ar' ? 'bg-white text-[var(--primary-color)] shadow-sm' : 'text-slate-400'}`}>AR</button>
            </div>
            <div className="hidden lg:block">
              <a href="#contact" className="btn btn-primary">
                {t('btn_start_project')} <i className={`fa-solid ${lang === 'ar' ? 'fa-arrow-left' : 'fa-arrow-right'}`}></i>
              </a>
            </div>
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-2xl ml-2">
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>

      {/* Mobile Menu Panel */}
      <div className={`fixed top-0 ${lang === 'ar' ? 'left-0' : 'right-0'} h-full w-4/5 max-w-sm bg-white z-50 shadow-2xl flex flex-col pt-24 px-8 pb-8 transition-transform duration-300 ease-in-out md:hidden ${mobileMenuOpen ? 'translate-x-0' : (lang === 'ar' ? '-translate-x-full' : 'translate-x-full')}`}>
        <button onClick={() => setMobileMenuOpen(false)} className={`absolute top-6 ${lang === 'ar' ? 'right-6' : 'left-6'} text-2xl text-slate-500 hover:text-slate-800`}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="flex flex-col gap-6 text-xl font-semibold mt-4">
          <a href="#home" onClick={() => setMobileMenuOpen(false)} className="pb-4 border-b border-slate-100">{t('nav_home')}</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="pb-4 border-b border-slate-100">{t('nav_about')}</a>
          <a href="#services" onClick={() => setMobileMenuOpen(false)} className="pb-4 border-b border-slate-100">{t('nav_services')}</a>
          <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="pb-4 border-b border-slate-100">{t('nav_projects')}</a>
          <a href="#packs" onClick={() => setMobileMenuOpen(false)} className="pb-4 border-b border-slate-100">{t('nav_packs')}</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="pb-4 border-b border-slate-100">{t('nav_contact')}</a>
        </div>
      </div>

      {/* Hero Section */}
      <section id="home" className="relative pt-40 pb-24 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#4A25E1]/5 border border-[#4A25E1]/10 text-[var(--primary-color)] rounded-full font-bold text-xs mb-6 shadow-sm tracking-wide">
              <span className="opacity-50">-</span> <span>{t('hero_badge')}</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight font-heading">
              {t('hero_title')} <span className="gradient-text">{t('hero_title_highlight')} {t('hero_title_end')}</span>
            </h1>
            <p className="text-lg text-slate-500 mb-10 max-w-lg">
              {t('hero_subtitle')}
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <a href="#contact" className="btn btn-primary">
                {t('btn_get_started')} <i className={`fa-solid ${lang === 'ar' ? 'fa-arrow-left' : 'fa-arrow-right'}`}></i>
              </a>
              <a href="#projects" className="btn btn-outline">{t('btn_view_portfolio')}</a>
            </div>
            <div className="text-slate-600 font-medium">
              <p><i className="fa-solid fa-check-circle text-[var(--primary-color)] mr-2"></i> {t('hero_trusted')}</p>
            </div>
          </div>

          <div className="relative hidden lg:flex justify-end items-center">
            <img src="/hero-illustration.png" alt="Digital Solutions Illustration" className="w-full max-w-[650px] object-contain scale-105 translate-x-6" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 mt-24 pt-8 border-t border-black/5 flex flex-wrap justify-between gap-6 items-center text-slate-400 text-xl font-bold">
          <div className="flex items-center gap-2 hover:text-slate-800 transition-colors cursor-pointer"><i className="fa-brands fa-microsoft"></i> Microsoft</div>
          <div className="flex items-center gap-2 hover:text-slate-800 transition-colors cursor-pointer"><i className="fa-brands fa-google"></i> Google</div>
          <div className="flex items-center gap-2 hover:text-slate-800 transition-colors cursor-pointer"><i className="fa-brands fa-aws"></i> AWS</div>
          <div className="flex items-center gap-2 hover:text-slate-800 transition-colors cursor-pointer"><i className="fa-brands fa-github"></i> GitHub</div>
          <div className="flex items-center gap-2 hover:text-slate-800 transition-colors cursor-pointer"><i className="fa-brands fa-docker"></i> Docker</div>
          <div className="flex items-center gap-2 hover:text-slate-800 transition-colors cursor-pointer"><i className="fa-solid fa-robot"></i> OpenAI</div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding">
        <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h4 className="section-subtitle">{t('about_subtitle')}</h4>
            <h2 className="section-title">{t('about_title')} <span className="gradient-text">{t('about_title_highlight')}</span> {t('about_title_end')}</h2>
            <p className="text-lg text-slate-500 mb-10">{t('about_text')}</p>

            <div className="flex flex-wrap gap-12">
              <div>
                <h3 className="text-4xl font-bold text-[var(--primary-color)] mb-1">+20</h3>
                <p className="font-semibold">{t('stat_projects')}</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-[var(--primary-color)] mb-1">100%</h3>
                <p className="font-semibold">{t('stat_satisfaction')}</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-[var(--primary-color)] mb-1">+2</h3>
                <p className="font-semibold">{t('stat_experience')}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <img src="/about-illustration.png" alt="About Isomorphe Tech" className="w-full max-w-[500px] object-contain rounded-[var(--radius-lg)]" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding bg-slate-50">
        <div className="max-w-7xl mx-auto px-8">
          <h4 className="section-subtitle">{t('services_subtitle')}</h4>
          <h2 className="section-title">{t('services_title')} <span className="gradient-text">{t('services_title_highlight')}</span> {t('services_title_end')}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mt-12">
            {[
              { i: 'fa-code', title: 'srv_web_title', desc: 'srv_web_desc' },
              { i: 'fa-mobile-screen-button', title: 'srv_mobile_title', desc: 'srv_mobile_desc' },
              { i: 'fa-pen-nib', title: 'srv_ui_title', desc: 'srv_ui_desc' },
              { i: 'fa-brain', title: 'srv_ai_title', desc: 'srv_ai_desc' },
              { i: 'fa-cloud', title: 'srv_cloud_title', desc: 'srv_cloud_desc' },
              { i: 'fa-headset', title: 'srv_support_title', desc: 'srv_support_desc' }
            ].map((srv, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-50 hover:-translate-y-1 transition-transform text-center flex flex-col items-center">
                <div className="w-14 h-14 bg-gradient-to-br from-[#4A25E1] to-[#8A2BE2] text-white rounded-[14px] flex items-center justify-center text-xl mb-5 shadow-lg shadow-[#4A25E1]/20">
                  <i className={`fa-solid ${srv.i}`}></i>
                </div>
                <h3 className="text-sm font-bold mb-3 text-slate-800">{t(srv.title)}</h3>
                <p className="text-[11px] leading-relaxed text-slate-500">{t(srv.desc)}</p>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8 bg-[#4A25E1]/[0.04] border border-[#4A25E1]/10 p-6 lg:p-8 rounded-2xl">
            {[
              { i: 'fa-bolt', title: 'feat_fast_title', desc: 'feat_fast_desc' },
              { i: 'fa-layer-group', title: 'feat_tech_title', desc: 'feat_tech_desc' },
              { i: 'fa-shield-halved', title: 'feat_secure_title', desc: 'feat_secure_desc' },
              { i: 'fa-clock', title: 'feat_247_title', desc: 'feat_247_desc' }
            ].map((feat, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <i className={`fa-solid ${feat.i} text-[#4A25E1] text-2xl mt-0.5 opacity-90`}></i>
                <div>
                  <h4 className="font-bold text-sm mb-1 text-slate-800">{t(feat.title)}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{t(feat.desc)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-padding">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-12 text-center md:text-left">
            <h4 className="section-subtitle">{t('projects_subtitle')}</h4>
            <h2 className="section-title mb-0">{t('projects_title')} <span className="gradient-text">{t('projects_title_highlight')}</span> {t('projects_title_end')}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'proj1_title', tag: 'tag_app', bg: 'bg-blue-500', icon: 'fa-stethoscope', link: projectLinks[0], image: '/clinic.png' },
              { title: 'proj2_title', tag: 'tag_app', bg: 'bg-orange-500', icon: 'fa-utensils', link: projectLinks[1], image: '/dareldjazair.png' },
              { title: 'proj3_title', tag: 'tag_web', bg: 'bg-emerald-500', icon: 'fa-cart-shopping', link: projectLinks[2], image: '/store.png' },
              { title: 'proj4_title', tag: 'tag_web', bg: 'bg-slate-800', icon: 'fa-building', link: projectLinks[3], image: '/archi.png' },
              { title: 'proj5_title', tag: 'tag_web', bg: 'bg-indigo-500', icon: 'fa-plane', link: projectLinks[4], image: '/travel.png' },
              { title: 'proj6_title', tag: 'tag_app', bg: 'bg-rose-500', icon: 'fa-burger', link: projectLinks[5], image: '/dawaka.png' },
            ].map((proj, idx) => (
              <div key={idx} className="project-card group">
                <div className="relative h-64 overflow-hidden">
                  {proj.image ? (
                    <img src={proj.image} alt={t(proj.title)} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center text-6xl text-white/50 ${proj.bg}`}>
                      <i className={`fa-solid ${proj.icon}`}></i>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-slate-900/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <a href={proj.link} target="_blank" rel="noreferrer" className="btn btn-primary transform translate-y-4 group-hover:translate-y-0 transition-all">
                      {t('btn_view_demo')}
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{t(proj.title)}</h3>
                  <span className="inline-block px-3 py-1 bg-[var(--primary-color)]/10 text-[var(--primary-color)] rounded-full text-sm font-semibold">{t(proj.tag)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packs Section */}
      <section id="packs" className="section-padding bg-slate-50">
        <div className="max-w-7xl mx-auto px-8">
          <h4 className="section-subtitle">{t('packs_subtitle')}</h4>
          <h2 className="section-title">{t('packs_title')} <span className="gradient-text">{t('packs_title_highlight')}</span> {t('packs_title_end')}</h2>

          <div className="flex justify-center mt-12">
            <div className="pricing-card border-2 border-[var(--primary-color)] w-full max-w-lg z-10 relative shadow-[var(--shadow-lg)] transform transition-transform hover:-translate-y-2">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white px-8 py-1.5 rounded-full text-sm font-bold shadow-md">
                {t('pack_popular')}
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-[var(--primary-color)]/10 text-[var(--primary-color)] rounded-xl flex items-center justify-center text-2xl">
                  <i className="fa-solid fa-rocket"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{t('pack1_name')}</h3>
                  <p className="text-sm text-slate-500">{t('pack1_desc')}</p>
                </div>
              </div>
              <div className="border-b border-black/5 pb-8 mb-8 text-center sm:text-left">
                <div className="text-sm font-bold text-slate-400 mb-1 tracking-wider uppercase">{lang === 'ar' ? 'ابتداءً من' : 'Starting from'}</div>
                <h2 className="text-5xl font-bold text-[var(--primary-color)]" dir="ltr">15,000 <span className="text-2xl font-normal text-slate-500">DZD</span></h2>
              </div>
              <ul className="space-y-4 mb-10 px-2">
                {[1, 2, 3, 4, 5].map(n => (
                  <li key={n} className="flex items-center gap-4 text-slate-700 font-medium"><i className="fa-solid fa-circle-check text-[var(--primary-color)] text-xl"></i> <span>{t(`pack2_f${n}`)}</span></li>
                ))}
              </ul>
              <a href="#contact" className="btn btn-primary w-full text-lg py-4 shadow-lg hover:shadow-xl">{t('btn_start_project')}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-8">
          <h4 className="section-subtitle">{t('process_subtitle')}</h4>
          <h2 className="section-title">{t('process_title')} <span className="gradient-text">{t('process_title_highlight')}</span> {t('process_title_end')}</h2>

          <div className="relative flex flex-col lg:flex-row justify-between mt-16 gap-8 lg:gap-0">
            <div className="hidden lg:block absolute top-[30px] left-0 w-full h-[2px] bg-[var(--primary-color)]/20 z-0"></div>

            {[
              { i: 'fa-magnifying-glass', title: 'proc1_title', desc: 'proc1_desc' },
              { i: 'fa-pen-ruler', title: 'proc2_title', desc: 'proc2_desc' },
              { i: 'fa-code', title: 'proc3_title', desc: 'proc3_desc' },
              { i: 'fa-vial-circle-check', title: 'proc4_title', desc: 'proc4_desc' },
              { i: 'fa-rocket', title: 'proc5_title', desc: 'proc5_desc' }
            ].map((proc, idx) => (
              <div key={idx} className="relative z-10 lg:w-[18%] flex lg:block items-center gap-6 lg:text-center">
                <div className="process-step-number">{`0${idx + 1}`}</div>
                <div>
                  <i className={`fa-solid ${proc.i} text-2xl text-[var(--primary-color)] mb-4 hidden lg:block`}></i>
                  <h4 className="text-lg font-bold mb-2">{t(proc.title)}</h4>
                  <p className="text-sm text-slate-500">{t(proc.desc)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="section-padding">
        <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16">
          <div>
            <h4 className="section-subtitle">{t('contact_subtitle')}</h4>
            <h2 className="section-title">{t('contact_title')} <span className="gradient-text">{t('contact_title_highlight')}</span> {t('contact_title_end')}</h2>
            <p className="text-lg text-slate-500 mb-10">{t('contact_desc')}</p>

            <div className="flex flex-col gap-6 my-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[var(--primary-color)]/10 text-[var(--primary-color)] rounded-xl flex items-center justify-center"><i className="fa-solid fa-envelope"></i></div>
                <div>
                  <h4 className="font-bold mb-1">{t('contact_email')}</h4>
                  <a href="mailto:contact@isomorphe.online" className="text-slate-500">contact@isomorphe.online</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[var(--primary-color)]/10 text-[var(--primary-color)] rounded-xl flex items-center justify-center"><i className="fa-solid fa-location-dot"></i></div>
                <div>
                  <h4 className="font-bold mb-1">{t('contact_location')}</h4>
                  <span className="text-slate-500">{t('contact_address')}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[var(--primary-color)]/10 text-[var(--primary-color)] rounded-xl flex items-center justify-center"><i className="fa-solid fa-phone"></i></div>
                <div>
                  <h4 className="font-bold mb-1">{t('contact_phone')}</h4>
                  <a href="tel:+213561336041" className="text-slate-500" dir="ltr">+213 56 13 36 041</a>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">{t('contact_follow')}</h4>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/isomorphetech/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-[var(--primary-color)] hover:text-white transition-colors"><i className="fa-brands fa-instagram"></i></a>
                <a href="https://www.facebook.com/profile.php?id=61591323042243" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-[var(--primary-color)] hover:text-white transition-colors"><i className="fa-brands fa-facebook-f"></i></a>
              </div>
            </div>
          </div>

          <div>
            <div className="glass-card p-10">
              <form onSubmit={handleFormSubmit}>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">{t('form_name')}</label>
                    <input type="text" name="name" required className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:border-[var(--primary-color)] focus:ring-[3px] focus:ring-[var(--primary-color)]/10 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">{t('form_email')}</label>
                    <input type="email" name="email" required className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:border-[var(--primary-color)] focus:ring-[3px] focus:ring-[var(--primary-color)]/10 outline-none transition-all" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">{t('form_phone')}</label>
                    <input type="tel" name="phone" className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:border-[var(--primary-color)] focus:ring-[3px] focus:ring-[var(--primary-color)]/10 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">{t('form_company')}</label>
                    <input type="text" name="company" className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:border-[var(--primary-color)] focus:ring-[3px] focus:ring-[var(--primary-color)]/10 outline-none transition-all" />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2">{t('form_message')}</label>
                  <textarea name="message" rows={5} required className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:border-[var(--primary-color)] focus:ring-[3px] focus:ring-[var(--primary-color)]/10 outline-none transition-all"></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-full">
                  {t('btn_send')} <i className={`fa-solid ${lang === 'ar' ? 'fa-paper-plane-top' : 'fa-paper-plane'}`}></i>
                </button>
                {formStatus && <p className="text-center font-bold mt-4 text-emerald-500">{formStatus}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-20 pb-6">
        <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <a href="#" className="inline-block mb-6">
              <img src="/logo.png" alt="Isomorphe Tech Logo" className="h-[80px] lg:h-[100px] brightness-0 invert object-contain" />
            </a>
            <p className="text-slate-400">{t('footer_desc')}</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-6">{t('footer_links')}</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#home" className="hover:text-white transition-colors">{t('nav_home')}</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">{t('nav_about')}</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">{t('nav_services')}</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">{t('nav_projects')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-6">{t('footer_services')}</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">{t('srv_web_title')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('srv_mobile_title')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('srv_ui_title')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('srv_ai_title')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-6">{t('footer_contact')}</h4>
            <ul className="space-y-4 text-slate-400 mb-8">
              <li><i className="fa-solid fa-envelope text-[var(--primary-color)] mr-3"></i> contact@isomorphe.online</li>
              <li><i className="fa-solid fa-phone text-[var(--primary-color)] mr-3"></i> <span dir="ltr">+213 56 13 36 041</span></li>
              <li><i className="fa-solid fa-location-dot text-[var(--primary-color)] mr-3"></i> {t('contact_address')}</li>
            </ul>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/profile.php?id=61591323042243" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--primary-color)] transition-colors"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="https://www.instagram.com/isomorphetech/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--primary-color)] transition-colors"><i className="fa-brands fa-instagram"></i></a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 pt-8 border-t border-white/10 text-center text-slate-500 text-sm">
          <p>&copy; 2026 Isomorphe Tech. {t('footer_rights')}</p>
        </div>
      </footer>

      {/* Persistent WhatsApp Button */}
      <a href="https://wa.me/213561336041" className="whatsapp-btn" target="_blank" rel="noopener noreferrer">
        <i className="fa-brands fa-whatsapp"></i>
      </a>

    </main>
  );
}
