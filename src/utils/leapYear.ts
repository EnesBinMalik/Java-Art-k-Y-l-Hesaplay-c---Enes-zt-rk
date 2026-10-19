import { LeapYearAnalysis } from '../types';

/**
 * Calculates whether a year is a leap year based on Gregorian Calendar rules:
 * 1. Year must be divisible by 4.
 * 2. If divisible by 100, it must also be divisible by 400.
 * 
 * Signature: ENES ÖZTÜRK
 */
export function analyzeLeapYear(year: number): LeapYearAnalysis {
  const remainder4 = ((year % 4) + 4) % 4;
  const remainder100 = ((year % 100) + 100) % 100;
  const remainder400 = ((year % 400) + 400) % 400;

  const isDivisibleBy4 = remainder4 === 0;
  const isDivisibleBy100 = remainder100 === 0;
  const isDivisibleBy400 = remainder400 === 0;

  // Leap year rule:
  // (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)
  const isLeap = (isDivisibleBy4 && !isDivisibleBy100) || isDivisibleBy400;

  let reason = '';
  if (isLeap) {
    if (isDivisibleBy400) {
      reason = `${year} yılı hem 100'ün hem de 400'ün katıdır (${year} % 400 = 0). Yüzyıl kuralı gereğince artık yıldır.`;
    } else {
      reason = `${year} yılı 4'e tam bölünür ve 100'ün katı değildir (${year} % 4 = 0, ${year} % 100 ≠ 0). Bu nedenle artık yıldır.`;
    }
  } else {
    if (isDivisibleBy100 && !isDivisibleBy400) {
      reason = `${year} yılı 100'ün katıdır fakat 400'e kalansız bölünemez (${year} % 400 = ${remainder400}). Yüzyıl kuralı gereğince artık yıl DEĞİLDİR.`;
    } else {
      reason = `${year} yılı 4'e kalansız bölünemez (${year} % 4 = ${remainder4}). Bu nedenle artık yıl DEĞİLDİR.`;
    }
  }

  // Exact output format specified by user prompt:
  // "2020 bir artık yıldır !"
  // "2021 bir artık yıldır değildir !"
  const resultMessage = isLeap
    ? `${year} bir artık yıldır !`
    : `${year} bir artık yıldır değildir !`;

  return {
    year,
    isLeap,
    resultMessage,
    remainder4,
    remainder100,
    remainder400,
    isDivisibleBy4,
    isDivisibleBy100,
    isDivisibleBy400,
    reason,
    totalDaysInYear: isLeap ? 366 : 365,
    februaryDays: isLeap ? 29 : 28,
  };
}

/**
 * Returns days metadata for February of a specific year
 */
export function getFebruaryDays(year: number) {
  const isLeap = analyzeLeapYear(year).isLeap;
  const daysCount = isLeap ? 29 : 28;
  
  // Date constructor for February 1st of `year`: month index is 1 for February
  const firstDayDate = new Date(year, 1, 1);
  // getDay(): 0 is Sunday, 1 is Monday ... convert to Monday = 0
  const jsDay = firstDayDate.getDay();
  // Monday = 0, Tuesday = 1, ..., Sunday = 6
  const startDayOfWeek = (jsDay + 6) % 7;

  return {
    year,
    isLeap,
    daysCount,
    startDayOfWeek,
  };
}

export const JAVA_CODE_STANDARD = `/**
 * =========================================================
 * Proje: Artık Yıl Hesaplama Programı
 * Geliştirici: ENES ÖZTÜRK
 * Dil: Java (Java 8 ve üzeri)
 * Açıklama: Kullanıcıdan alınan yıl değerinin artık yıl
 *           olup olmadığını kontrol eden konsol uygulaması.
 * =========================================================
 */

import java.util.Scanner;

public class ArtikYil {
    public static void main(String[] args) {
        // Kullanıcıdan veri almak için Scanner nesnesi oluşturulur
        Scanner scanner = new Scanner(System.in);

        System.out.print("Yıl Giriniz : ");
        int yil = scanner.nextInt();

        // Artık yıl algoritması:
        // 1. 4'e tam bölünecek VE 100'e bölünmeyecek VEYA
        // 2. 400'e tam bölünecek
        boolean artikYilMi = (yil % 4 == 0 && yil % 100 != 0) || (yil % 400 == 0);

        // Kullanıcı isteğine göre formatlanmış çıktı
        if (artikYilMi) {
            System.out.println(yil + " bir artık yıldır !");
        } else {
            System.out.println(yil + " bir artık yıldır değildir !");
        }

        // Programcı İmzası
        System.out.println("\\n--- Hazırlayan: ENES ÖZTÜRK ---");
        
        scanner.close();
    }
}`;

export const JAVA_CODE_IF_ELSE_NESTED = `/**
 * =========================================================
 * Proje: Artık Yıl Hesaplama (Açık ve Eğitici If-Else Mantığı)
 * Geliştirici: ENES ÖZTÜRK
 * =========================================================
 */

import java.util.Scanner;

public class ArtikYilIfElse {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Yıl Giriniz : ");
        int yil = scanner.nextInt();

        boolean artikYil = false;

        // Kural 1: 4'e kalansız bölünüyor mu?
        if (yil % 4 == 0) {
            // Kural 2: 100'e kalansız bölünüyor mu? (Yüzyıl yılı)
            if (yil % 100 == 0) {
                // Kural 3: 100'e bölünenlerden sadece 400'e bölünenler artık yıldır!
                if (yil % 400 == 0) {
                    artikYil = true;  // Örn: 1600, 2000, 2400
                } else {
                    artikYil = false; // Örn: 1700, 1800, 1900, 2100
                }
            } else {
                artikYil = true;      // Örn: 2020, 2024, 1996
            }
        } else {
            artikYil = false;         // Örn: 2021, 2022, 2023
        }

        // Sonuç Ekranı
        if (artikYil) {
            System.out.println(yil + " bir artık yıldır !");
        } else {
            System.out.println(yil + " bir artık yıldır değildir !");
        }

        scanner.close();
    }
}`;

export const JAVA_CODE_MODERN = `/**
 * =========================================================
 * Proje: Artık Yıl Hesaplama (Modern Java - java.time API)
 * Geliştirici: ENES ÖZTÜRK
 * =========================================================
 */

import java.time.Year;
import java.util.Scanner;

public class ArtikYilModern {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.print("Yıl Giriniz : ");
        int yil = input.nextInt();

        // Java 8 ile gelen java.time.Year sınıfının isLeap() metodu
        boolean artikMi = Year.isLeap(yil);

        System.out.println(yil + (artikMi ? " bir artık yıldır !" : " bir artık yıldır değildir !"));
        
        System.out.println("\\nİmza: ENES ÖZTÜRK");
        input.close();
    }
}`;

export const PRESET_YEARS = [
  { year: 2020, label: '2020', tag: 'Senaryo Örneği (Artık Yıl)' },
  { year: 2021, label: '2021', tag: 'Senaryo Örneği (Artık Yıl Değil)' },
  { year: 2024, label: '2024', tag: 'Güncel Artık Yıl' },
  { year: 2000, label: '2000', tag: 'Özel Yüzyıl (400\'ün katı, Artık)' },
  { year: 1900, label: '1900', tag: 'İstisna Yüzyıl (100\'ün katı, 400 değil!)' },
  { year: 2100, label: '2100', tag: 'Gelecek İstisna Yüzyıl' },
  { year: 2400, label: '2400', tag: 'Gelecek 400 Katı (Artık Yıl)' },
];
