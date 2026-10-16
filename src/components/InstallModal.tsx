import React from 'react';
import { Language } from '../types/recipe';
import { AppLogo } from './AppLogo';
import { X, Smartphone, Download, CheckCircle, Share2, ShieldCheck, ExternalLink } from 'lucide-react';

interface InstallModalProps {
  isOpen: boolean;
  lang: Language;
  isInstallable: boolean;
  isInstalled: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  onInstall: () => Promise<boolean>;
  onClose: () => void;
}

export const InstallModal: React.FC<InstallModalProps> = ({
  isOpen,
  lang,
  isInstallable,
  isInstalled,
  isIOS,
  isAndroid,
  onInstall,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="install-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-[#FAF8F5] text-[#18181B] rounded-2xl border border-pink-200 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 bg-[#FCE7F3] border-b border-pink-200 shrink-0">
          <div className="flex items-center gap-3">
            <AppLogo className="w-10 h-10 rounded-full bg-white p-0.5 border border-pink-200 shadow-xs" />
            <div>
              <h2 id="install-modal-title" className="text-sm font-bold text-stone-900">
                {lang === 'ar'
                  ? 'تحميل وتثبيت التطبيق على الهاتف (APK / أندرويد)'
                  : 'Installer l’Application sur Mobile (APK / Android / iOS)'}
              </h2>
              <p className="text-[11px] text-stone-600 font-medium">
                bestrecipes أحسن الأطباق · best-recipes.digital
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Status banner */}
          {isInstalled ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-emerald-950">
                  {lang === 'ar' ? 'التطبيق مثبت بالفعل!' : 'Application Déjà Installée !'}
                </p>
                <p className="text-xs text-emerald-800 mt-1">
                  {lang === 'ar'
                    ? 'يعمل التطبيق الآن كبرنامج أصلي على شاشة هاتفك مع العمل بدون إنترنت وبأعلى سرعة.'
                    : 'L’application fonctionne en mode autonome sur votre écran d’accueil avec accès hors-ligne.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-pink-100/70 border border-pink-200 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-[#9A3412]">
                  {lang === 'ar' ? 'تطبيق أندرويد متكامل (WebAPK & PWA)' : 'Application Android Complète (WebAPK & PWA)'}
                </p>
                <p className="text-xs text-stone-700 leading-relaxed">
                  {lang === 'ar'
                    ? 'يمكنك تثبيت التطبيق بنقرة واحدة ليعمل كملف APK أصلي على هاتفك مع أيقونة مستقلة وسرعة فائقة بدون متجر Play.'
                    : 'Installez directement l’application sur votre smartphone Android sans passer par le store : icône sur l’écran, plein écran et mode hors-ligne.'}
                </p>
              </div>
              <Smartphone className="w-8 h-8 text-[#9A3412] shrink-0" />
            </div>
          )}

          {/* Action 1: One-Tap Install on Android */}
          {isInstallable && !isInstalled && (
            <button
              type="button"
              onClick={async () => {
                const installed = await onInstall();
                if (installed) onClose();
              }}
              className="w-full py-3.5 px-5 rounded-xl text-sm font-semibold text-white bg-[#15803D] hover:bg-[#166534] transition-colors flex items-center justify-center gap-2.5 shadow-sm cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>
                {lang === 'ar'
                  ? 'تثبيت الآن على أندرويد (تثبيت فوري مباشر)'
                  : 'Installer Maintenant sur Android (1 Clic Direct)'}
              </span>
            </button>
          )}

          {/* Action 2: Standalone APK Generator for Android */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-stone-900 font-semibold text-xs">
                <ShieldCheck className="w-4 h-4 text-[#9A3412]" />
                <span>
                  {lang === 'ar'
                    ? 'تحميل ملف APK مستقل (.apk)'
                    : 'Télécharger le fichier APK (.apk) pour Android'}
                </span>
              </div>
              <a
                href="https://www.pwabuilder.com/reportcard?site=https://best-recipes.digital"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#9A3412] text-white hover:bg-[#7C2D12] transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'إنشاء وتنزيل APK' : 'Générer mon APK'}</span>
              </a>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed">
              {lang === 'ar'
                ? 'إذا كنت تريد ملف .apk قابل للمشاركة والتثبيت اليدوي، اضغط على الزر أعلاه (أداة PWABuilder الرسمية من مايكروسوفت/جوجل). ستقوم الأداة بإنشاء وتنزيل ملف best-recipes.apk فوراً!'
                : 'Si vous souhaitez un fichier .apk brut à installer sur votre téléphone Android ou distribuer : cliquez sur le bouton ci-dessus (PWABuilder). Il génère automatiquement le fichier best-recipes.apk prêt à installer !'}
            </p>
          </div>

          {/* Action 3: Netlify Drop zip package with ALL images */}
          <div className="p-4 rounded-xl bg-pink-50 border border-pink-200 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-stone-900 font-semibold text-xs">
                <Download className="w-4 h-4 text-[#9A3412]" />
                <span>
                  {lang === 'ar'
                    ? 'حزمة الموقع الكاملة لـ Netlify (مع كافة الصور)'
                    : 'Pack Déploiement Netlify Drop (avec TOUTES les images)'}
                </span>
              </div>
              <a
                href="/best-recipes-dist.zip"
                download="best-recipes-dist.zip"
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-900 text-white hover:bg-stone-800 transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'تحميل dist.zip الكامل' : 'Télécharger dist.zip'}</span>
              </a>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed">
              {lang === 'ar'
                ? 'هام لموقعك best-recipes.digital على Netlify: هذا الملف يحتوي على جميع ملفات الموقع مع مجلد الصور الكامل وأكواد التوجيه _redirects. فقط اسحب ملف best-recipes-dist.zip إلى netlify.com/drop وستظهر جميع الصور فوراً!'
                : 'Important pour votre site best-recipes.digital sur Netlify : ce fichier zip contient TOUTES les images culinaires, le code optimisé et la redirection SPA. Glissez simplement ce fichier best-recipes-dist.zip sur netlify.com/drop pour que toutes les photos s’affichent parfaitement !'}
            </p>
          </div>

          {/* Manual Browser Step Instructions */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-600">
              {lang === 'ar'
                ? 'طريقة التثبيت المباشر من المتصفح (أندرويد / آيفون)'
                : 'Comment Installer Depuis le Navigateur (Chrome / Safari)'}
            </h3>

            {/* Android Guide */}
            <div className="p-3.5 rounded-xl bg-white border border-stone-200 space-y-2">
              <div className="flex items-center gap-2 text-stone-900 font-semibold text-xs">
                <Smartphone className="w-4 h-4 text-emerald-700" />
                <span>
                  {lang === 'ar'
                    ? 'على هاتف أندرويد (متصفح Chrome)'
                    : 'Sur Android (Google Chrome)'}
                </span>
              </div>
              <ol className="text-xs text-stone-600 space-y-1.5 list-decimal list-inside leading-relaxed">
                <li>
                  {lang === 'ar'
                    ? 'افتح موقع best-recipes.digital في متصفح Chrome.'
                    : 'Ouvrez best-recipes.digital dans Chrome sur votre smartphone.'}
                </li>
                <li>
                  {lang === 'ar'
                    ? 'اضغط على قائمة الثلاث نقاط ⋮ في أعلى المتصفح.'
                    : 'Appuyez sur le menu (trois points ⋮) en haut à droite.'}
                </li>
                <li>
                  {lang === 'ar'
                    ? 'اختر "تثبيت التطبيق" (Installer l\'application).'
                    : 'Sélectionnez "Installer l\'application" (ou "Ajouter à l\'écran d\'accueil").'}
                </li>
                <li>
                  {lang === 'ar'
                    ? 'سيتم تثبيت التطبيق كبرنامج أصلي على هاتفك مع أيقونة bestrecipes.'
                    : 'L’application s’installe instantanément sur votre écran d’accueil avec son icône.'}
                </li>
              </ol>
            </div>

            {/* iOS Guide */}
            <div className="p-3.5 rounded-xl bg-white border border-stone-200 space-y-2">
              <div className="flex items-center gap-2 text-stone-900 font-semibold text-xs">
                <Share2 className="w-4 h-4 text-sky-700" />
                <span>
                  {lang === 'ar'
                    ? 'على هواتف آيفون (Safari)'
                    : 'Sur iPhone (Safari)'}
                </span>
              </div>
              <ol className="text-xs text-stone-600 space-y-1.5 list-decimal list-inside leading-relaxed">
                <li>
                  {lang === 'ar'
                    ? 'اضغط على زر المشاركة (Partager ⎋) في شريط Safari.'
                    : 'Appuyez sur le bouton de Partage (⎋) en bas dans Safari.'}
                </li>
                <li>
                  {lang === 'ar'
                    ? 'اختر "إضافة إلى الصفحة الرئيسية" (Sur l\'écran d\'accueil).'
                    : 'Choisissez "Sur l\'écran d\'accueil" puis validez.'}
                </li>
              </ol>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-semibold text-stone-700 bg-stone-200 hover:bg-stone-300 rounded-lg transition-colors cursor-pointer"
            >
              {lang === 'ar' ? 'إغلاق' : 'Fermer'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
