package kr.goci.goa.commons;

import java.io.File;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.function.Function;
import java.util.stream.Collectors;

public class Utils {
    public static class Encode {
        static String encode(Function<Integer, Character> lookup, int number) {
            int loopCounter = 0;
            boolean done = false;

            String str = "";

            while (!done) {
                str = str + lookup.apply(((number >> (4 * loopCounter)) & 0x0f) | randomByte());
                done = number < (Math.pow(16, loopCounter + 1));
                loopCounter++;
            }

            return str;
        }

        static int randomByte() {
            return ((int) Math.floor(Math.random() * 256)) & 0x30;
        }
    }

    public static class Alphabet {
        private static final String ORIGINAL = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";

        static long seed = 1;
        private static final Random random = new Random(seed);

        static String alphabet;
        static String shuffled;

        private static void reset() {
            shuffled = null;
        }

        private static void setCharacters(String _alphabet_) {
            if (_alphabet_ == null) {
                if (alphabet != ORIGINAL) {
                    alphabet = ORIGINAL;
                    reset();
                }
            }

            if (_alphabet_.equals(alphabet)) {
                return;
            }


            if (_alphabet_.length() != ORIGINAL.length()) {
                throw new RuntimeException("Custom alphabet for shortid must be " + ORIGINAL.length() + " unique characters. You submitted " + _alphabet_.length() + " characters: " + _alphabet_);
            }

            List<String> characters = Arrays.asList(_alphabet_.split(""));
            List duplicates = Arrays.asList(_alphabet_.split("")).stream().filter((String c) -> Collections.frequency(characters, c) > 1).collect(Collectors.toList());


            if (duplicates.size() > 0) {
                throw new RuntimeException("Custom alphabet for shortid must be " + ORIGINAL.length() + " unique characters. These characters were not unique: " + duplicates.stream().collect(Collectors.joining(", ")));
            }

            alphabet = _alphabet_;
            reset();
        }

        static String characters(String _alphabet_) {
            setCharacters(_alphabet_);
            return alphabet;
        }

        static void setSeed(Long _seed_) {
            random.setSeed(_seed_);
            if (seed != _seed_) {
                reset();
                seed = _seed_;
            }
        }

        private static String shuffle() {
            if (alphabet == null) {
                setCharacters(ORIGINAL);
            }

            List<String> sourceArray = Arrays.asList(alphabet.split(""));
            Collections.shuffle(sourceArray, random);
            return sourceArray.stream().collect(Collectors.joining(""));
        }

        static String getShuffled() {
            if (shuffled != null) {
                return shuffled;
            }
            shuffled = shuffle();
            return shuffled;
        }

        static Character lookup(int index) {
            String alphabetShuffled = getShuffled();
            return alphabetShuffled.charAt(index);
        }
    }

    public static class ShortId {
        private static final int version = 6;
        private static final Long REDUCE_TIME = 1459707606518L;
        private static int clusterWorkerId = 0;

        private static int counter;
        private static int previousSeconds;


        public static void seed(Long seedValue) {
            Alphabet.setSeed(seedValue);
        }

        public static void worker(int workerId) {
            clusterWorkerId = workerId;
        }

        public static String characters(String newCharacters) {
            if (newCharacters != null) {
                Alphabet.characters(newCharacters);
            }

            return Alphabet.getShuffled();
        }

        /**
         * Generate unique id
         * Returns string id
         */
        public static String generate() {

            String str = "";

            int seconds = (int) Math.floor((System.currentTimeMillis() - REDUCE_TIME) * 0.001);

            if (seconds == previousSeconds) {
                counter++;
            } else {
                counter = 0;
                previousSeconds = seconds;
            }

            str = str + Encode.encode(Alphabet::lookup, version);
            str = str + Encode.encode(Alphabet::lookup, clusterWorkerId);
            if (counter > 0) {
                str = str + Encode.encode(Alphabet::lookup, counter);
            }
            str = str + Encode.encode(Alphabet::lookup, seconds);

            return str;
        }
    }
}
